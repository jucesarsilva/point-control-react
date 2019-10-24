import moment from 'moment'

const dateFormatMask = 'YYYY-MM-DD'

const dateFormatMaskBR = 'DD-MM-YYYY'

const formatDate = (day, mask) => {
  return moment(day).format(mask)
}

const parseDate = (date) => {
  let day  = date.split("-")[0]
  let month  = date.split("-")[1]
  let year  = date.split("-")[2]
  return `${year}-${('0'+month).slice(-2)}-${('0'+day).slice(-2)}`
}

export {parseDate,  formatDate, dateFormatMask, dateFormatMaskBR }