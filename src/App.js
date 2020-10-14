import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import * as R from 'ramda'
import {format} from 'date-fns'
import { makeCookieString, getCookie } from './cookie'
import Modal from './Modal'

const log = console.log // eslint-disable-line no-unused-vars

, addCode = (comp, code) => {
    if (code === `OTHER`) {
      comp.setState({showOtherModal: true})
    }
    comp.setState((oldState, props) => ({
      chosenCodes: oldState.chosenCodes.includes(code) ? oldState.chosenCodes.filter(x => x !== code) : oldState.chosenCodes.concat(code)
    }))
  }
, addUnitName = (comp, evt) => comp.setState({unitName: evt.target.value})
, updateUserName = (comp, evt) => comp.setState({userName: evt.target.value})
, updateJobName = (comp, evt) => comp.setState({job: evt.target.value})
, saveUserName = (comp) => {
    document.cookie=makeCookieString('userName', comp.state.userName, 365)
    comp.setState({deviceId: comp.state.userName})
  }
, saveJobName = (comp) => {
    if (!comp.state.job) alert(`Property name required`)
    document.cookie=makeCookieString('job', comp.state.jobName, 365)
    comp.setState({jobName: comp.state.job})
  }
, endJob = (comp) => {
    document.cookie=makeCookieString('job', ``, 365)
    comp.setState({jobName: ``, job: ``})
  }
, addCodes = comp => {
    const { unitName, chosenCodes, otherDesc } = comp.state
    if (!!unitName && chosenCodes.length) {
      if (chosenCodes.includes('Went Back')) {
        getOldRecords(comp)
        .then(r => {
          if(!r.errors) {
            deleteOldRecord(comp, R.head(r.data.unitCodes))
          } else {
            console.log(r.errors)
          }
        })
        .then(r => saveCodes(comp))
      } else if (chosenCodes.includes(`OTHER`)) {
        comp.setState(state => ({
          chosenCodes: chosenCodes.map(cc => {
            if (cc === `OTHER`) return `OTHER ${otherDesc}`
            return cc
          })
        }), () => saveCodes(comp))
      } else {
        saveCodes(comp)
      }
    }
  }
, CodeButton = styled.button`
    background-color: ${props => props.state.chosenCodes.includes(props.code) ? 'green' : 'none'};
    color: ${props => props.state.chosenCodes.includes(props.code) ? 'white' : (props.code.includes(`Completed`) ? 'green' : 'none')};
    width: 99%;
    padding: 15px;
  `
, SaveButton = styled.button`
    background-color: #805716;
    color: #ffffff;
    width: 99%;
    padding: 25px 15px;
    margin: 5px;
    border-radius: 10px;
  `
, SaveJobButton = styled.button`
    background-color: green;
    color: #ffffff;
    width: 99%;
    padding: 25px 15px;
    margin: 5px;
    border-radius: 10px;
    text-transform: uppercase;
  `
, EndJobButton = styled.button`
    background-color: red;
    color: #ffffff;
    width: 99%;
    padding: 25px 15px;
    margin: 5px;
    border-radius: 10px;
    text-transform: uppercase;
  `
, AddCodesButton = styled.button`
    width: 100%;
    padding: 20px;
    background-color: #74fff8;
  `
// [String] -> [Array] -> null
, handleCSVDownload = (columns, data) => {
    const CSVHead = `${columns.reduce((soFar, column) => `${soFar}"${column}",`, '').slice(0, -1)}\r\n`
    let CSVBody = data.reduce((soFar, row) => `${soFar}"${row.join('","')}"\r\n`, [])
    if (typeof CSVBody === "string") {
      CSVBody = CSVBody.trim()
    } else CSVBody = ''
    /* taken from react-csv */
    const csv = `${CSVHead}${CSVBody}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const dataURI = `data:text/csv;charset=utf-8,${csv}`

    const URL = window.URL || window.webkitURL
    const downloadURI = typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', downloadURI)
    link.setAttribute('download', 'tableDownload.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
, formatData = data => R.sortBy(R.props('createdAt'), data).map(x => [ x.unit, x.codes, x.createdAt, x.deviceId, x.job ]).reverse()
, getUnitCodesAndDownload = (comp) => {
    return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            unitCodes {
              unit
              codes
              createdAt
              deviceId
              job
            }
          }
        `
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => r.json())
    .then(r => {
      const withCSTTime = r.data.unitCodes.map(uc => R.assoc('createdAt', format(new Date(uc.createdAt), 'MM/DD/YYYY h:mm'), uc))
      comp.setState({allUnitCodes: withCSTTime, showModal: true})
    })
    .catch(console.error)
  }
  // assume codes are put in correctly, only first has to match because they'll be the same type
, firstCodeMatches = (codes, x) => codes.includes(x.codes.split(', ')[0])
, downloadServiceWithIssuesUnitCodes = (comp, deviceId) => {
    const deviceUnitCodes = comp.state.allUnitCodes.filter(x => x.deviceId === deviceId && firstCodeMatches(comp.state.servicedWithIssuesCodes, x))
    const data = formatData(deviceUnitCodes)
    handleCSVDownload(comp.state.columns, data)
    comp.setState({showModal: false})
  }
, downloadServiceNoIssuesUnitCodes = (comp, deviceId) => {
    const deviceUnitCodes = comp.state.allUnitCodes.filter(x => x.deviceId === deviceId && firstCodeMatches(comp.state.servicedNoIssuesCodes, x))
    const data = formatData(deviceUnitCodes)
    handleCSVDownload(comp.state.columns, data)
    comp.setState({showModal: false})
  }
, downloadPerJob = (comp, job) => {
    const jobUnitCodes = comp.state.allUnitCodes.filter(x => x.job === job)
    const data = formatData(jobUnitCodes)
    handleCSVDownload(comp.state.columns, data)
  }
, downloadUnservicedUnitCodesFromDevice = (comp, deviceId) => {
    const deviceUnitCodes = comp.state.allUnitCodes
      .filter(
        unitCode => unitCode.deviceId === deviceId &&
        // if not No issues and not serviced with issues, it's unserviced
        !firstCodeMatches(comp.state.servicedWithIssuesCodes, unitCode) &&
        !firstCodeMatches(comp.state.servicedNoIssuesCodes, unitCode)
      )
    const data = formatData(deviceUnitCodes)
    handleCSVDownload(comp.state.columns, data)
    comp.setState({showModal: false})
  }
, downloadAllUnitCodesFromDevice = (comp, deviceId) => {
    const deviceUnitCodes = comp.state.allUnitCodes
      .filter(unitCode => unitCode.deviceId === deviceId)
    const data = formatData(deviceUnitCodes)
    handleCSVDownload(comp.state.columns, data)
    comp.setState({showModal: false})
  }
;
class App extends Component {
  constructor() {
    super()
    this.state = {
      chosenCodes: [],
      unitName: '',
      unitCodes: [],
      allUnitCodes: [],
      userName: '',
      deviceId: getCookie('userName'),
      jobName: getCookie('job'),
      showModal: false,
      showOtherModal: false,
      otherDesc: ``,
      columns: ['unit', 'codes', 'created date', 'device ID', `job`],
      unServicedCodes: [
        'TV'
      , 'Dog'
      , 'Blocked'
      , 'Locked From The Inside'
      , 'No Key'
      , 'Key Not Work'
      , 'Skip Per Management'
      , 'Minor'
      , 'Denied Entry'
      , 'see css'
      , 'OTHER'
      ],
      servicedWithIssuesCodes: [
        'Missing Chimney Cap'
      , 'Missing Damper'
      , 'Broken Damper'
      , 'Missing Spark Screen'
      , 'Damaged Spark Screen'
      , 'Damaged Left Refractory Panel'
      , 'Damaged Back Refractory Panel'
      , 'Damaged Right Refractory Panel'
      , 'Damaged Base Panel'
      , 'Missing Left Refractory Panel'
      , 'Missing Back Refractory Panel'
      , 'Missing Right Refractory Panel'
      , 'Missing Base Panel'
      , 'see  css'
      , 'Went Back'
      ],
      servicedNoIssuesCodes: [
        `Completed. No Issues.`
      ],
    }
  }

  updateOtherDesc = evt => {
    this.setState({
      otherDesc: evt.target.value,
      showOtherModal: false,
    })
  }
  closeOtherModal = evt => {
    this.setState({ showOtherModal: false })
  }

  render() {
    const { state } = this

    return (
      <div>
        {
          !state.deviceId &&
            <div>
              <input
                name="username"
                placeholder="User Name"
                style={{width: '100%', padding: '20px', boxSizing: 'border-box'}}
                value={state.userName}
                onChange={evt => updateUserName(this, evt)}
                type="text"
              />
              <SaveButton onClick={evt => saveUserName(this)}>Save User Name</SaveButton>
            </div>
        }
        {
          !state.jobName &&
            <div>
              <input
                name="jobname"
                placeholder="Property Name"
                style={{width: '100%', padding: '20px', boxSizing: 'border-box'}}
                value={state.job}
                onChange={evt => updateJobName(this, evt)}
                type="text"
              />
              <SaveJobButton onClick={evt => saveJobName(this)}>Start new property</SaveJobButton>
            </div>
        }
        <input name="unit" placeholder="Unit" style={{width: '100%', padding: '20px', boxSizing: 'border-box'}} value={state.unitName} onChange={evt => addUnitName(this, evt)} type="text" />
        {
          state.servicedWithIssuesCodes.map((x, i) =>
            <CodeButton
              state={state}
              code={x}
              key={x}
              onClick={evt => addCode(this, x)}
            >
              {x}
            </CodeButton>)
        }
        <br />
        {
          state.servicedNoIssuesCodes.map((x, i) =>
            <CodeButton
              state={state}
              code={x}
              key={x}
              onClick={evt => addCode(this, x)}
            >
              {x}
            </CodeButton>)
        }
        <br />
        <br />
        {
          state.unServicedCodes.map((x, i) =>
            <CodeButton
              state={state}
              code={x}
              key={x}
              onClick={evt => addCode(this, x)}
            >
              {x}
            </CodeButton>)
        }
        <AddCodesButton onClick={evt => addCodes(this)}>Add Codes</AddCodesButton>
        <ul id="report" style={{
          listStyleType: 'none'
        }}>
        {
          state.unitCodes.map((x, i) => <li key={i}>{x}</li>)
        }
        </ul>
        { !!this.state.jobName &&<EndJobButton onClick={evt => endJob(this)}>End Property</EndJobButton>}
        <button style={{
          padding: '25px',
          width: '100%',
          marginBottom: '50px'
        }} onClick={evt => getUnitCodesAndDownload(this)}>Download Report</button>
        <Modal
          open={state.showModal}
          close={evt => this.setState({showModal: false})}
        >
          <h4>Which device to you want to download codes from</h4>
          {
            Object.keys(R.groupBy(R.prop('deviceId'), this.state.allUnitCodes))
              .map(x =>
                (<div>
                  <button key={x} onClick={evt => downloadServiceNoIssuesUnitCodes(this, x)}>{`${x} (Completed. No Issues)`}</button>
                  <button key={x} onClick={evt => downloadServiceWithIssuesUnitCodes(this, x)}>{`${x} (Completed with issues)`}</button>
                  <button key={x} onClick={evt => downloadUnservicedUnitCodesFromDevice(this, x)}>{`${x} (NA)`}</button>
                  <button key={x} onClick={evt => downloadAllUnitCodesFromDevice(this, x)}>{`All`}</button>
                </div>)
              )
          }
          <h4>Job Reports</h4>
          {
            Object.keys(R.groupBy(R.prop(`job`), this.state.allUnitCodes)).map(job => {
              return <button key={job} onClick={evt => downloadPerJob(this, job)}>{job}</button>
            })
          }
        </Modal>
        <Modal
          open={state.showOtherModal}
          close={evt => this.setState({showOtherModal: false})}
        >
          <h4>Add description</h4>
          <input type="text" value={this.otherDesc} onBlur={this.updateOtherDesc} />
          <button onClick={evt => this.setState({showOtherModal: false})}>Save</button>
        </Modal>
      </div>
    );
  }
}

function saveCodes(comp) {
      return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation {
              createUnitCode(data: {
                deviceId: "${comp.state.deviceId}"
                unit: "${comp.state.unitName}"
                codes: "${comp.state.chosenCodes.join(', ')}"
                job: "${comp.state.jobName}"
              }) {
                id job
              }
            }
          `
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .then(r => {
         if(!!r && !!r.data && !!r.data.createUnitCode && !r.errors) {
           comp.setState((oldState) => ({
             unitCodes: [...oldState.unitCodes, [oldState.unitName, oldState.chosenCodes.join(', ')]],
             chosenCodes: [],
             unitName: '',
           }))
         } else {
           comp.setState((oldState) => ({
             unitCodes: [...oldState.unitCodes, [oldState.unitName, 'NOT SAVED. make sure you have a internet connection and try again']],
             chosenCodes: [],
             unitName: '',
           }))
         }
         }
      )
      .catch(console.error)
}
function deleteOldRecord(comp, recordToDelete) {
      return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation {
              deleteUnitCode(where: {
                id: "${recordToDelete.id}"
              }) {
                id
              }
            }
          `
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .catch(console.error)
}
function getOldRecords(comp) {
      return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
        method: 'POST',
        body: JSON.stringify({
          query: `
            {
              unitCodes(orderBy: createdAt_DESC where: {
                deviceId: "${comp.state.deviceId}"
                unit: "${comp.state.unitName}"
              }) {
                id
                createdAt
                codes
                job
              }
            }
          `
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(r => r.json())
      .catch(console.error)
}

export default App;
