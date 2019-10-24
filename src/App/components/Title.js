import PropTypes from 'prop-types'
import React from 'react'

const Title = ({
  children,
  color = 'blueviolet',
  fontSize = '24px',
  fontFamily = 'Sans-serif',
  fontWeight = '600',
  margin = '8px 0'
}) => (
    <div
      style={{
        color,
        fontSize,
        fontFamily,
        fontWeight,
        margin
      }}
    >
      {children}
    </div>
  )

Title.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.string,
  margin: PropTypes.string
}

export default Title