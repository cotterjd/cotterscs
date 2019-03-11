import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import * as R from 'ramda'
import { makeCookieString, getCookie } from './cookie'
import Modal from './Modal'

const log = console.log // eslint-disable-line no-unused-vars
, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
, getRandomIndex = (xs) => Math.floor(Math.random() * ((xs.length - 1) + 1))
, getId = chars => Array(6).fill(null).map((_) => chars[getRandomIndex(chars)]).join('')
, getDeviceId = () => getId(chars)

, addCode = (comp, code) => {
    comp.setState((oldState, props) => ({
      chosenCodes: oldState.chosenCodes.includes(code) ? oldState.chosenCodes.filter(x => x !== code) : oldState.chosenCodes.concat(code)
    }))
  }
, addUnitName = (comp, evt) => comp.setState({unitName: evt.target.value})
, addCodes = comp => {
    if (!!comp.state.unitName && !!comp.state.chosenCodes.length) {
      return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation {
              createUnitCode(data: {
                deviceId: "${comp.state.deviceId}"
                unit: "${comp.state.unitName}"
                codes: "${comp.state.chosenCodes.join(', ')}"
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
      .then(() => {
         comp.setState((oldState) => ({
           unitCodes: [...oldState.unitCodes, [oldState.unitName, oldState.chosenCodes.join(', ')]],
           chosenCodes: [],
           unitName: '',
         }))
         }
      )
      .catch(console.error)
    }

  }
, CodeButton = styled.button`
    background-color: ${props => props.state.chosenCodes.includes(props.code) ? 'green' : 'none'};
    width: 100%;
    padding: 10px;
  `

, handleCSVDownload = (columns, data) => {
    const CSVHead = `${columns.reduce((soFar, column) => `${soFar}"${column}",`, '').slice(0, -1)}\r\n`
    const CSVBody = data.reduce((soFar, row) => `${soFar}"${row.join('","')}"\r\n`, []).trim()

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
, formatData = data => R.sortBy(R.props('createdAt'), data).map(x => [ x.unit, x.codes, x.createdAt, x.deviceId ]).reverse()
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
      comp.setState({allUnitCodes: r.data.unitCodes, showModal: true})
    })
    .catch(console.error)
  }
, downloadUnitCodesFromDevice = (comp, deviceId) => {
    const deviceUnitCodes = comp.state.allUnitCodes.filter(x => x.deviceId === deviceId)
    const data = formatData(deviceUnitCodes)
    handleCSVDownload(['unit', 'codes', 'created date', 'device ID'], data)
    comp.setState({showModal: false})
  }
;
class App extends Component {
  constructor() {
    super()
    const deviceId = getCookie('deviceId')
    if (!deviceId) {
      document.cookie=makeCookieString('deviceId', getDeviceId(), 3650)
    }
    this.state = {
      codes: {
        mmc: 'Missing Chimney Cap'
      , md: 'Missing Damper'
      , bd: 'Broken Damper'
      , mss: 'Missing Spark Screen'
      , dss: 'amaged Spark Screen'
      , lrp: 'damaged Left Refractory Panel'
      , brp: 'damaged Back Refractory Panel'
      , rrp: 'damaged Right Refractory Panel'
      , bp: 'damaged Base Panel'
      , mlrp: 'Missing Left Refractory Panel'
      , mbrp: 'Missing Back Refractory Panel'
      , mrrp: 'Missing Right Refractory Panel'
      , mbp: 'Missing Base Panel'
      , tv: 'TV'
      , dog: 'DOG'
      , b: 'Blocked'
      , l: 'Locked from the inside'
      , nk: 'No Key'
      , knw: 'Key Not Work'
      , s: 'Skip per mgmt'
      , min: 'Minor'
      },
      chosenCodes: [],
      unitName: '',
      unitCodes: [],
      allUnitCodes: [],
      deviceId: deviceId,
      showModal: false,
    }
  }
  render() {
    const { state } = this

    return (
      <div>
        <input name="unit" placeholder="Unit" style={{width: '100%', padding: '20px'}} value={state.unitName} onChange={evt => addUnitName(this, evt)} type="text" />
        {
          Object.keys(state.codes).map((k, i) =>
            <CodeButton
              state={state}
              code={k}
              key={k}
              onClick={evt => addCode(this, k)}
            >
              {state.codes[k]}
            </CodeButton>)
        }
        <button style={{
          width: '100%',
          padding: '15px',
          backgroundColor: '#74fff8'
        }} onClick={evt => addCodes(this)}>Add Codes</button>
        <ul id="report" style={{
          listStyleType: 'none'
        }}>
        {
          state.unitCodes.map((x, i) => <li key={i}>{x}</li>)
        }
        </ul>
        <button style={{
          padding: '10px',
        }} onClick={evt => getUnitCodesAndDownload(this)}>Download Report</button>
        <Modal
          open={state.showModal}
          close={evt => this.setState({showModal: false})}
        >
          <h4>Which device to you want to download codes from</h4>
          {
            Object.keys(R.groupBy(R.prop('deviceId'), this.state.allUnitCodes))
              .map(x => <button key={x} onClick={evt => downloadUnitCodesFromDevice(this, x)}>{`Device ${x}`}</button>)
          }
        </Modal>
      </div>
    );
  }
}

export default App;
