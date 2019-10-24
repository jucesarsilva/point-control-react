const _User_ = 'user'

const getUser = () => {
  return JSON.parse(sessionStorage.getItem(_User_))
}

const setUser = (user) => {
  sessionStorage.setItem(_User_, JSON.stringify(user))
}

function clearUser() {
  sessionStorage.removeItem(_User_)
}

export { getUser, setUser, clearUser }