import React, { Component } from 'react'

class Button extends Component {

  constructor(props) {

    super(props)

    const defaults = {
      label: 'Botão',
      type: 'submit',
      color: 'white',
      backgroundColor: 'blueviolet',
      padding: '8px',
      margin: '0',
      fontSize: '16px',
      cursor: 'pointer',
      outlineWidth: 0,
      border: 'none',
      borderRadius: 'unset'
    }

    this.state = {
      props: { ...defaults, ...props }
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onMouseEnter = () => {
    let props = { ...this.state.props }
    props.backgroundColor = '#973deb'
    this.setState({ 'props': props })
  }

  onMouseLeave = () => {
    let props = { ...this.state.props }
    props.backgroundColor = 'blueviolet'
    this.setState({ 'props': props })
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    return (
      <button
        type={this.state.props.type}
        style={this.state.props}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}>
        {this.state.props.label}
      </button>
    )
  }
}

export default Button