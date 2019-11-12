import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Wrapper from 'App/components/Wrapper'
import Button from 'App/components/Button'
import { clearUser } from 'Utils/userInfo'
import { clearToken } from 'Utils/token'

class Layout extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { ...props }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    clearToken();
    clearUser();
    window.location.href = ''
  }

  render() {
    return (
      <>
        <Wrapper padding='20px' backgroundColor='#655BA2'>
          Controle de ponto
          <Button
            float='right'
            onClick={this.onClick}
            label='Sair'
            margin="0"
            padding="5px 15px"
            borderRadius="0" />
        </Wrapper>
        <section style={{ height: 'calc(100vh - 60px - 59px)', overflow: 'auto' }}>
          {this.props.children}
        </section>
        <Wrapper padding='20px' backgroundColor='#333333'>
          Controle de ponto
        </Wrapper>
      </>
    )
  }
}

export default Layout
