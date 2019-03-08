import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

const log = console.log // eslint-disable-line no-unused-vars
, addCode = (comp, code) => {
    comp.setState((oldState, props) => ({
      chosenCodes: oldState.chosenCodes.includes(code) ? oldState.chosenCodes.filter(x => x !== code) : oldState.chosenCodes.concat(code)
    }))
  }
, addUnitName = (comp, evt) => comp.setState({unitName: evt.target.value})
, addCodes = comp => {
    comp.setState((oldState) => ({
      unitCodes: [...oldState.unitCodes, [oldState.unitName, oldState.chosenCodes.join(', ')]],
      chosenCodes: [],
      unitName: '',
    }))
  }
, CodeButton = styled.button`
    background-color: ${props => props.state.chosenCodes.includes(props.code) ? 'green' : 'none'}
  `

, handleCSVDownload = (columns, data) => {
    log(data)
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

, getData = ({ state }) => {

  }
;
class App extends Component {
  state = {
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
  }
  render() {
    const { state } = this

    return (
      <div>
        <label htmlFor="unit">Unit</label>
        <input name="unit" value={state.unitName} onChange={evt => addUnitName(this, evt)} type="text" />
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
          padding: '10px',
        }} onClick={evt => addCodes(this)}>Add Codes</button>
        <button style={{
          width: '100%',
          padding: '10px',
        }} onClick={evt => handleCSVDownload(['unit', 'codes'], state.unitCodes)}>Download Report</button>
        <ul id="report" style={{
          listStyleType: 'none'
        }}>
        {
          state.unitCodes.map((x, i) => <li key={i}>{x}</li>)
        }
        </ul>

      </div>
    );
  }
}

export default App;
