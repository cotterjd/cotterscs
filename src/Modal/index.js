import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const
  log = console.log // eslint-disable-line

, Esc = styled.span`
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 24px;
    opacity: 0.5;

    :hover {
      cursor: pointer;
    }
  `
; // eslint-disable-line semi

// NOT IN USE. CONSIDER PURGING
export default class Modal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }
  render() {
    const { props } = this
    , Container = styled.div`
        width: ${props.width || 'auto'};
        height: ${props.height || 'auto'};
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        top: 0;
        left: 0;

        overflow-y: scroll;
        padding: 30px;
        display: ${props => props.open ? 'block' : 'none'};
        z-index: 3;
        position: fixed;
        ${props.styles}
      `
    ; // eslint-disable-line semi
    return (
      <Container open={props.open}>
        <Esc
          onClick={props.close}
          className="clickable"
        >&#x2715;</Esc>
        {props.children}
      </Container>
    )
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
}
