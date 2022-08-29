import styled from 'styled-components'

export const CodeButton = styled.button`
    background-color: ${props => props.state.chosenCodes.includes(props.code) ? 'green' : 'none'};
    color: ${props => props.state.chosenCodes.includes(props.code) ? 'white' : (props.code.includes(`Completed`) ? 'green' : 'none')};
    width: 99%;
    padding: 15px;
  `
export const SaveButton = styled.button`
    background-color: #805716;
    color: #ffffff;
    width: 99%;
    padding: 25px 15px;
    margin: 5px;
    border-radius: 10px;
  `
export const SaveJobButton = styled.button`
    background-color: green;
    color: #ffffff;
    width: 99%;
    padding: 25px 15px;
    margin: 5px;
    border-radius: 10px;
    text-transform: uppercase;
  `
export const EndJobButton = styled.button`
    background-color: red;
    color: #ffffff;
    width: 99%;
    padding: 25px 15px;
    margin: 5px;
    border-radius: 10px;
    text-transform: uppercase;
  `
export const AddCodesButton = styled.button`
    width: 100%;
    padding: 20px;
    background-color: #74fff8;
  `