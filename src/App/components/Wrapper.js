import PropTypes from 'prop-types'
import React from 'react'

const Wrapper = ({
  children,
  padding = '20px 10px',
  color = 'white',
  backgroundColor
}) => (
    <div
      style={{
        padding,
        color,
        backgroundColor
      }}
    >
      {children}
    </div>
  )

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Wrapper
