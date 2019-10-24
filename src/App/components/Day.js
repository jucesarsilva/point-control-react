import React, { Component } from 'react'
import Time from 'App/components/Time'
import Form from 'App/components/Form'
import Button from 'App/components/Button'

class Day extends Component {

  constructor(props) {
    super(props)
    this.state = { ...props }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  displayTimes() {
    if (!this.state.value.points) return ''
    return this.state.value.points.map((point, index) => {
      return <Time point={point} key={index} />
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.value.points) {
      this.props.history.push(`/times/edit/${this.state.value.codDay}`)
    }
    else {
      this.props.history.push(`/times/new/${encodeURI(this.state.value.date)}`)
    }
  }

  render() {
    return (
      <li style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        listStyleType: 'none',
        border: '1px solid gray',
        borderBottom: this.state.last ? '1px solid gray' : 'none'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {this.state.value.date}: {this.displayTimes()}
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Button label={!this.state.value.points ? 'Inserir' : 'Editar'  }
            margin="0 10px"
            padding="5px 15px"
            borderRadius="0" />
        </Form>
      </li>
    )
  }
}

export default Day