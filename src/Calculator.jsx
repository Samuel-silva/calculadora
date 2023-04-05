import './Calculator.css'
import React, { Component } from 'react'
import Button from './components/Button'
import Display from './components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  indexArray: 0,
}
export default class Calculator extends Component {
  state = {...initialState}

  constructor(props) {
    super(props)

    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  clearMemory() {
    this.setState({...initialState})
  }

  setOperation(operation) {
    if (this.state.indexArray === 0) {
      this.setState({ operation, indexArray: 1, clearDisplay: true })
    } else {
      const equals = operation === '=';
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      if (currentOperation === '+') {
        values[0] = parseFloat(values[0]) + parseFloat(values[1]);
      } else if (currentOperation === '−') {
        values[0] = parseFloat(values[0]) - parseFloat(values[1]);
      } else if (currentOperation === '×') {
        values[0] = parseFloat(values[0]) * parseFloat(values[1]);
      } else if (currentOperation === '÷') {
        values[0] = parseFloat(values[0]) / parseFloat(values[1]);
      } else {
        values[0] = this.state.values[0]
      }

      values[1] = 0;

      const numbersBeforeDot = values[0].toString().split(".")[0];
      const numbersAfterDot = values[0].toString().split(".")[1];
      let toFixed;
      let error = '';

      if (numbersBeforeDot.length <= 10) {
        if (!numbersAfterDot) {
          toFixed = 0;
        } else if ((numbersBeforeDot.length + numbersAfterDot.length + 1) <= 10) {
          toFixed = numbersAfterDot.length;
        } else {
          toFixed = 10 - (numbersBeforeDot.length + 1);
        }
      } else {
        error = 'ERROR'
      }

      if (error === '') {
        this.setState({
          displayValue: values[0].toFixed(toFixed),
          operation: equals ? null : operation,
          indexArray: equals ? 0 : 1,
          clearDisplay: !equals,
          values
        })
      } else {
        this.setState({...initialState, clearDisplay: true, displayValue: error })
      }
    }
  }

  addDigit(n) {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return;
    }
    if (this.state.displayValue.length > 9 && !this.state.clearDisplay) {
      return
    }

    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const numberFormater = this.state.displayValue === '0' && n === '.' ? '0.' : n;
    const displayValue = currentValue + numberFormater;

    this.setState({displayValue, clearDisplay: false})

    if (n !== '.') {
      const i = this.state.indexArray
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]

      values[i] = newValue
      this.setState({ values })
    }
  }

  render() {
    return (
      <div className="content">
        <div className="calculator">
          <Display value={this.state.displayValue} />
          <Button label="AC" click={this.clearMemory} triple />
          <Button label="÷" click={this.setOperation} operation />
          <Button label="7" click={this.addDigit} />
          <Button label="8" click={this.addDigit} />
          <Button label="9" click={this.addDigit} />
          <Button label="×" click={this.setOperation} operation />
          <Button label="4" click={this.addDigit} />
          <Button label="5" click={this.addDigit} />
          <Button label="6" click={this.addDigit} />
          <Button label="−" click={this.setOperation} operation />
          <Button label="1" click={this.addDigit} />
          <Button label="2" click={this.addDigit} />
          <Button label="3" click={this.addDigit} />
          <Button label="+" click={this.setOperation} operation />
          <Button label="0" click={this.addDigit} double />
          <Button label="." click={this.addDigit} />
          <Button label="=" click={this.setOperation} operation />
        </div>
      </div>
    )
  }
}
