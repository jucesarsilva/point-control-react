import axios from 'axios'
import { getToken } from 'Utils/token'

const API = axios.create({
  baseURL: "http://localhost.com.br:8081/api",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
  },
})

export default API