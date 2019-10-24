import React, { Component } from 'react'
import Error from 'App/components/Error'

class Input extends Component {

  constructor(props) {
    super(props)
    const defaults = {
      type: 'text',
      name: `input-${Math.random().toFixed(4)}`,
      value: '',
      placeholder: 'placeholder',
      backgroundColor: '#d1d1d1',
      padding: '10px 8px',
      outlineWidth: 0,
      border: 'none',
      borderBottom: '1px solid gray',
      clear: null,
      index: null
    }
    this.state = {
      props: { ...defaults, ...props }
    }
    this.containerStyle = {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      marginBottom: '20px',
    }
    this.errorStyle = {
      color: 'red',
      fontSize: '12px'
    }
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(event) {
    let props = { ...this.state.props }
    props.value = event.target.value
    props.onChange(props.value)
    this.setState({ 'props': props })
  }

  onFocus = () => {
    let props = { ...this.state.props }
    props.borderBottom = '1px solid blueviolet'
    this.setState({ 'props': props })
  }

  onBlur = () => {
    let props = { ...this.state.props }
    props.borderBottom = '1px solid gray'
    this.setState({ 'props': props })
  }

  onClick() {
    if (this.props.clear) 
      this.props.clear(this.props.index)
  }

  displayClear = () => {
    return <div
    onClick={this.onClick}
    style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      fontWeight: 'bold',
      color: 'red',
      cursor: 'pointer'
    }}>x</div>
  }

  render() {
    return (
      <label style={this.containerStyle}>
        <input
          type={this.state.props.type}
          name={this.state.props.name}
          value={this.state.props.value}
          placeholder={this.state.props.placeholder}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={this.state.props}
          autoComplete="off"
        />
        {this.props.clear ? this.displayClear() : '' }
        <Error error={this.props.error} message={this.props.message} />
      </label>
    )
  }
}

export default Input