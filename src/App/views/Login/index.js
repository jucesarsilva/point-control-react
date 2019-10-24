import axios from 'axios'
import React, { Component } from 'react'
import Card from 'App/components/Card'
import Title from 'App/components/Title'
import Form from 'App/components/Form'
import Input from 'App/components/Input'
import Button from 'App/components/Button'
import { setToken } from 'Utils/token'
import { setUser } from 'Utils/userInfo'
import toastConfig from 'Utils/toastConfig'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'App/views/Login/index.css'

class Login extends Component {

  constructor(props) {

    super(props)

    this.state = {
      login: '',
      password: '',
    };

    this.error = {
      login: false,
      password: false
    };

    this.message = {
      login: 'O campo login é de preenchimento obrigatório.',
      password: 'O campo senha é de preenchimento obrigatório.'
    }

    this.handleChangeLogin = this.handleChangeLogin.bind(this)
    this.handleChangePassaword = this.handleChangePassaword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeLogin(value) {
    if (!value || !value.length) {
      this.error.login = true
    } else {
      this.error.login = false
    }
    this.setState({ login: value })
  }

  handleChangePassaword(value) {
    if (!value || !value.length) {
      this.error.password = true
    } else {
      this.error.password = false
    }
    this.setState({ password: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.error.login || this.error.password) {
      return
    }
    axios.post('http://localhost.com.br:8081/api/auth/login', {
      login: this.state.login,
      password: this.state.password
    })
      .then((resp) => {
        setUser({
          codUser: resp.data.codUser,
          name: resp.data.name,
          email: resp.data.email,
          roles: resp.data.roles,
        })
        setToken(`${resp.data.tokenType} ${resp.data.accessToken}`)
        window.location.href = '/'
      })
      .catch(() => {
        toast.error("Login/Senha inválido(s).", toastConfig)
      })
  }

  render() {
    return (
      <section className="login">
        <Card>
          <Title>
            Controle de Ponto
					</Title>
          <Form onSubmit={this.handleSubmit}>
            <Input name="login" type="text" placeholder="Login"
              value={this.state.login}
              onChange={this.handleChangeLogin}
              error={this.error.login}
              message={this.message.login}
            />
            <Input name="password" type="password" placeholder="Senha"
              value={this.state.password}
              onChange={this.handleChangePassaword}
              error={this.error.password}
              message={this.message.password}
            />
            <Button label="Acessar" />
          </Form>
        </Card>
        <ToastContainer />
      </section>
    )
  }
}

export default Login