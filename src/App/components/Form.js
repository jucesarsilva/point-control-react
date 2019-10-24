import PropTypes from 'prop-types'
import React from 'react'

const Form = ({
  children,
  onSubmit
}) => (
    <form onSubmit={onSubmit}>
      {children}
    </form>
  )

Form.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.func,
}

export default Form