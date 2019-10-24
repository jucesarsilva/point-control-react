import PropTypes from 'prop-types'
import React from 'react'

const Error = ({
  error,
  message
}) => (
    error ?
      <span style={{ color: 'red', fontSize: '12px' }}>
        {message}
      </span> : null
  )

Error.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string
}

export default Error