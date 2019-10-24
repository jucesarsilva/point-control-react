// import moment from 'moment'
import React, { Component } from 'react'
import API from 'Utils/api'
import Layout from 'App/containers/Layout'
import Input from 'App/components/Input'
import Form from 'App/components/Form'
import Button from 'App/components/Button'
import toastConfig from 'Utils/toastConfig'
import { getUser } from 'Utils/userInfo'
import { ToastContainer, toast } from 'react-toastify'
import { parseDate, formatDate, dateFormatMaskBR } from 'Utils/format'

import 'react-toastify/dist/ReactToastify.css'

class Times extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...props,
      editing: false,
      removing: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  getDays = () => {
    API.get(`day/${this.props.match.params.id}`)
      .then((resp) => {
        this.setState({ 'day': resp.data })
      })
      .catch(() => {
        toast.error("Não foi possível carregar as marcações de ponto.", toastConfig)
      })
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ 'editing': true })
      this.getDays()
    }
    if (this.props.match.params.date) {
      this.setState({ 'editing': false })
      this.setState({
        day: {
          codUser: getUser().codUser,
          date: parseDate(this.props.match.params.date),
          points: []
        }
      })
    }
  }

  showDate() {
    if (this.state.day) {
      return <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#949494',
        color: 'white'
      }}>
        Dia: {formatDate(this.state.day.date, dateFormatMaskBR)}
        <Form onSubmit={this.handleAdd}>
          <Button label='+'
            margin="0 10px"
            padding="5px 10px"
            borderRadius="50%" />
        </Form>
      </div>
    }
    return ''
  }

  updateModel(value, day) {
    if (!value || !value.length) {
      day.error = true
      day.message = 'Marcação inválida.'
    } else {
      day.error = false
    }
    day.time = value
  }

  displayInputs() {
    if (this.state.day) {
      return <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline'
      }}>
        {
          this.state.day.points.map((point, index) =>
            <Input type="text"
              index={index}
              clear={this.onRemove}
              maxWidth="80px"
              marginRight="15px"
              name={`time ${index + 1}`}
              placeholder={`marcação ${index + 1}`}
              key={index}
              value={point.time}
              onChange={(value) => this.updateModel(value, point)}
              error={point.error}
              message={point.message}
            />
          )
        }
        {
          this.state.day.points.length === 0 ? '' : 
          <Form onSubmit={this.handleSubmit}>
            <Button label='Salvar'
              margin="0 10px"
              padding="5px 15px"
              borderRadius="0" />
          </Form>
        }
        
      </div>
    }
    return ''
  }

  handleSubmit(event) {
    event.preventDefault()
    this.persist()
  }

  persist() {
    if (this.state.editing) {
      API.post(`day/update`, this.state.day)
        .then((resp) => {
          toast.success("Marcações de pontos atualizadas com sucesso.", toastConfig)
        })
        .catch(() => {
          toast.error("Não foi possível atualizar as marcações de ponto.", toastConfig)
        })
    } else {
      API.post(`day/save`, this.state.day)
        .then((resp) => {
          this.props.history.push(`/times/edit/${resp.data.codDay}`)
          toast.success("Marcações de pontos salvas com sucesso.", toastConfig)
        })
        .catch(() => {
          toast.error("Não foi possível salvar as marcações de ponto.", toastConfig)
        })
    }
  }

  handleAdd(event) {
    event.preventDefault()
    let day = { ...this.state.day }
    if (this.state.editing) {
      day.points.push({
        codDay: this.props.match.params.id,
        time: '00:00:00'
      })
      this.setState({ 'day': day })
    } else {
      day.points.push({
        time: '00:00:00'
      })
      this.setState({ 'day': day })
    }
  }

  onClick() {
    this.props.history.push('')
  }

  onRemove(index) {
    if (this.state.removing) return
    let day = { ...this.state.day }
    let point = day.points[index];
    if (!point.hasOwnProperty('codPoint')) {
      day.points.splice(index, 1)
      this.setState({ 'day': day })
    } else {
      this.setState({ 'removing': true })
      API.post(`point/delete`, point)
        .then(() => {
          this.setState({ 'removing': false })
          this.getDays()
          toast.success("Marcação de ponto removida com sucesso.", toastConfig)
        })
        .catch(() => {
          this.setState({ 'removing': false })
          toast.error("Não foi possível remover a marcação de ponto.", toastConfig)
        })
    }
  }

  render() {
    return (
      <Layout>
        <section style={{ padding: '20px' }}>
          <Button
            onClick={this.onClick}
            label='Voltar'
            margin="0 0 20px 0"
            padding="5px 15px"
            borderRadius="0" />
          {this.showDate()}
          {this.displayInputs()}
        </section>
        <ToastContainer />
      </Layout>
    )
  }
}

export default Times
