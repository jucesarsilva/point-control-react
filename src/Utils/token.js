const _TOKEN_ = 'token'

const getToken = () => {
  return sessionStorage.getItem(_TOKEN_)
}

const setToken = (token) => {
  sessionStorage.setItem(_TOKEN_, token)
}

function clearToken() {
  sessionStorage.removeItem(_TOKEN_)
}

export { getToken, setToken, clearToken }
