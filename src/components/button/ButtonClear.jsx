import React from 'react'
import ButtonBase from './ButtonBase'

export default props =>
  <ButtonBase label={props.label || 'AC'} click={props.click} triple />
