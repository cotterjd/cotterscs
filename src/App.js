import React, { Component } from 'react';
import './App.css';
import * as R from 'ramda'
import xhr from './xhr'
import {format} from 'date-fns'
import { makeCookieString, getCookie } from './cookie'
import Modal from './Modal'
import utils, { handleCSVDownload } from './utils'
import { CodeButton, SaveButton, SaveJobButton, EndJobButton, AddCodesButton } from './styled'

const log = console.log // eslint-disable-line no-unused-vars

, addCode = (comp, code) => {
    if (code === `OTHER` || code === `Broken Damper - Other`) {
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
// [String] -> [Array] -> null
, formatData = data => R.sortBy(R.props('createdAt'), data).map(x => [ x.unit, x.codes, x.createdAt, x.deviceId, x.job ]).reverse()
, getUnitCodesAndDownload = (comp) => {
    xhr.listUnitCodes()
    .then(r => {
      const withCSTTime = r.data.unitCodes.map(uc => R.assoc('createdAt', format(new Date(uc.createdAt), 'MM/DD/YYYY h:mm'), uc))
      comp.setState({allUnitCodes: withCSTTime})
    })
    .catch(console.error)
  }
  // assume codes are put in correctly, only first has to match because they'll be the same type
, firstCodeMatches = (codes, x) => codes.includes(x.codes.split(', ')[0])
, downloadServiceWithIssuesUnitCodes = (comp, deviceId) => {
    const deviceUnitCodes = comp.state.allUnitCodes.filter(
        x => x.deviceId === deviceId && (firstCodeMatches(comp.state.servicedWithIssuesCodes, x) || x.codes.split(`, `).some(code => code.includes(`Broken Damper - Other`) ) )
        )
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
    const sortedCodes = R.sortBy(R.prop(`codes`), jobUnitCodes) 
    const data = formatData(sortedCodes)
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
, getOldRecords = (comp) => {
    return xhr.listOldRecords(comp.state.jobName, comp.state.unitName)
  }
, deleteOldRecord = (recordToDelete) => {
    return xhr.del(recordToDelete.id)
      .then(r => r.json())
      .catch(console.error)
  }
, redoCode = (comp, unitCodeArray, i) => {
    const id = R.head(unitCodeArray) 
    const unitName = R.head(R.tail(unitCodeArray))
    // const chosenCodes = R.last(unitCodeArray).split(`, `)
    xhr.del(id)
      .then(r => r.json())
      .then(_ => {
        comp.setState({
          unitName, 
          // chosenCodes,
        })
      })
      .catch(console.error)
  }
, goodResponse = (r) => {
    return r && r.data && r.data.createUnitCode && !r.errors
  }
, addCodesAndReset = (response, oldState) => {
    const newUnitCode = response.data.createUnitCode
    return {
      unitCodes: [...oldState.unitCodes, [newUnitCode.id, oldState.unitName, oldState.chosenCodes.join(', ')]],
      chosenCodes: [],
      unitName: '',
    }
  }
, saveCodes = (comp) => {
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
              id job unit
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
       if(goodResponse(r)) {
         console.log(`RESPONSE`, r)
         comp.setState(oldState => addCodesAndReset(r, oldState))
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
;
class App extends Component {
  constructor() {
    super()
    this.foobar = React.createRef()
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
      , 'Broken Damper - Other'
      , 'Broken Damper - stays open'
      , 'Broken Damper - closed/won\'t open'
      , 'Broken Damper - Not Connected'
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
    getUnitCodesAndDownload(this)
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
  addCodes = _ => {
    const { unitName, chosenCodes, otherDesc } = this.state
    if (unitName && chosenCodes.length) {
      if (chosenCodes.includes('Went Back')) {
        getOldRecords(this)
        .then(r => {
          if(!r.errors) {
            deleteOldRecord(R.head(r.data.unitCodes))
          } else {
            console.log(r.errors)
          }
        })
        .then(r => saveCodes(this))
      } else if (chosenCodes.includes(`OTHER`)) {
        this.setState(_ => ({
          chosenCodes: chosenCodes.map(cc => {
            if (cc === `OTHER`) return `OTHER ${otherDesc}`
            return cc
          })
        }), () => saveCodes(this))
      } else if (chosenCodes.includes(`Broken Damper - Other`)) {
        this.setState(state => ({
          chosenCodes: chosenCodes.map(cc => {
            if (cc === `Broken Damper - Other`) return `Broken Damper - Other ${otherDesc}`
            return cc
          })
        }), () => saveCodes(this))
      } else {
        saveCodes(this)
      }
    }
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
        <AddCodesButton onClick={this.addCodes}>Add Codes</AddCodesButton>
        <ul id="report" style={{
          listStyleType: 'none'
        }}>
        {
          state.unitCodes.map((x, i) => <li key={i}>
              {x}<button onClick={evt => redoCode(this, x, i)}>Redo</button>
              </li>)
        }
        </ul>
        { !!this.state.jobName &&<EndJobButton onClick={evt => endJob(this)}>End Property</EndJobButton>}
        <h4>Reports By User/type</h4>
        {
          Object.keys(R.groupBy(R.prop('deviceId'), this.state.allUnitCodes))
            .map((x, i) =>
              (<div key={i}>
                <button onClick={evt => downloadServiceNoIssuesUnitCodes(this, x)}>{`${x} (Completed. No Issues)`}</button>
                <button onClick={evt => downloadServiceWithIssuesUnitCodes(this, x)}>{`${x} (Completed with issues)`}</button>
                <button onClick={evt => downloadUnservicedUnitCodesFromDevice(this, x)}>{`${x} (NA)`}</button>
                <button onClick={evt => downloadAllUnitCodesFromDevice(this, x)}>{`All`}</button>
              </div>)
            )
        }
        <h4>Property Reports</h4>
        {
          utils.sortedJobNames(this.state.allUnitCodes).map(jobName => {
            return <button key={jobName} onClick={_ => downloadPerJob(this, jobName)}>{jobName}</button>
          })
        }
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

export default App;
