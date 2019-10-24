import moment from 'moment'
import React, { Component } from 'react'
import API from 'Utils/api'
import Layout from 'App/containers/Layout'
import TableDay from 'App/components/TableDay'
import Day from 'App/components/Day'
import Button from 'App/components/Button'
import toastConfig from 'Utils/toastConfig'
import { formatDate, dateFormatMask, dateFormatMaskBR } from 'Utils/format'
import { ToastContainer, toast } from 'react-toastify'
import DatePicker from "react-datepicker"
import { registerLocale } from "react-datepicker"
import ptBr from 'date-fns/locale/pt-BR'
import { addDays, differenceInDays  } from 'date-fns';

import 'react-toastify/dist/ReactToastify.css'
import "react-datepicker/dist/react-datepicker.css"
import './index.css'

registerLocale('pt-BR', ptBr)

class Days extends Component {

  constructor(props) {
    super(props)
    this.state = {
      days: [],
      tableDays: [],
      startDate: moment().startOf("day").subtract(31, "days").toDate(),
      endDate: new Date()
    }
    this.onFilter = this.onFilter.bind(this)
  }

  componentDidMount() {
    this.onFilter()
  }

  handleChangeStartDate = date => {
    this.setState({
      startDate: date
    })
  }

  handleChangeEndDate = date => {
    this.setState({
      endDate: date
    })
  }

  onFilter() {
    let startDate = encodeURI(moment(this.state.startDate).format(dateFormatMask))
    let endDate = encodeURI(moment(this.state.endDate).format(dateFormatMask))
    API.get(`days/${startDate}/${endDate}`)
      .then((resp) => {
        this.setState({ days: resp.data })
        let dates = this.getDatesByFilter(this.state.endDate, this.state.startDate)
        let period = dates.map(date => moment(date).format(dateFormatMaskBR))
        period = period.reverse()
        let tableDays = period.map((date, index) => {
          let day = this.state.days.find(d => moment(d.date).format(dateFormatMaskBR) === date)
          if (day) day.date = formatDate(day.date, dateFormatMaskBR)
          return day || { date: date }
        })
        this.setState({ tableDays: tableDays })
      })
      .catch(() => {
        toast.error("Não foi possível atualizar as marcações de ponto.", toastConfig)
      })
  }

  getDatesByFilter(endDate, startDate) {
    const days = differenceInDays(endDate, startDate)
    return [...Array(days+1).keys()].map((i) => addDays(startDate, i))
  }

  displayDays() {
    return this.state.tableDays.map((day, index) =>
      <Day key={index}
        value={day}
        history={this.props.history}
        last={index === (this.state.tableDays.length - 1)} />
    )
  }

  render() {
    return (
      <Layout>
        <div className="filters-content">
          <DatePicker className="datepicker"
            placeholderText="Dt. início"
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            selected={this.state.startDate} 
            onChange={this.handleChangeStartDate} />
          <DatePicker className="datepicker"
            placeholderText="Dt. fim"
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            selected={this.state.endDate} 
            onChange={this.handleChangeEndDate} />
          <Button
            onClick={this.onFilter}
            label='Filtrar'
            margin="0"
            padding="5px 15px"
            borderRadius="0" />
        </div>
        <TableDay padding='20px'>
          {this.displayDays()}
        </TableDay>
        <ToastContainer />
      </Layout>
    )
  }
}

export default Days
