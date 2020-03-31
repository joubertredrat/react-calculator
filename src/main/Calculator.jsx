import React, { Component } from 'react'
import './Calculator.css'

import ButtonClear from '../components/button/ButtonClear'
import ButtonDigit from '../components/button/ButtonDigit'
import ButtonDigitDouble from '../components/button/ButtonDigitDouble'
import ButtonOperation from '../components/button/ButtonOperation'
import Display from '../components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {

  state = { ...initialState }

  constructor(props) {
    super(props)
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const currentOperation = this.state.operation

      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }
      values[1] = 0

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit(digit) {
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + digit

    this.setState({ displayValue, clearDisplay: false })

    if (digit !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <ButtonClear click={this.clearMemory} />
        <ButtonOperation label="/" click={this.setOperation} />
        <ButtonDigit label="7" click={this.addDigit} />
        <ButtonDigit label="8" click={this.addDigit} />
        <ButtonDigit label="9" click={this.addDigit} />
        <ButtonOperation label="*" click={this.setOperation} />
        <ButtonDigit label="4" click={this.addDigit} />
        <ButtonDigit label="5" click={this.addDigit} />
        <ButtonDigit label="6" click={this.addDigit} />
        <ButtonOperation label="-" click={this.setOperation} />
        <ButtonDigit label="1" click={this.addDigit} />
        <ButtonDigit label="2" click={this.addDigit} />
        <ButtonDigit label="3" click={this.addDigit} />
        <ButtonOperation label="+" click={this.setOperation} />
        <ButtonDigitDouble label="0" click={this.addDigit} />
        <ButtonDigit label="." click={this.addDigit} />
        <ButtonOperation label="=" click={this.setOperation} />
      </div>
    )
  }
}
