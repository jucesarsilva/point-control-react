import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Wrapper from 'App/components/Wrapper'

class Layout extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  render() {
    return (
      <>
        <Wrapper padding='20px' backgroundColor='#655BA2'>
          Controle de ponto
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
