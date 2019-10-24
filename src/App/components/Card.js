import PropTypes from 'prop-types'
import React from 'react'

const Card = ({
  children,
  display = 'flex',
  flexDirection = 'column',
  alignItems = 'center',
  justifyContent = 'start',
  padding = '20px',
  margin = 'auto',
  backgroundColor = 'white',
  minHeight = '250px',
  maxWidth = '600px',
  minWidth = '300px',
  borderRadius = '10px',
  boxShadow = '0px 0px 8px 3px rgba(0,0,0,0.25)'
}) => (
    <div
      style={{
        display,
        flexDirection,
        alignItems,
        justifyContent,
        padding,
        margin,
        backgroundColor,
        minHeight,
        maxWidth,
        minWidth,
        borderRadius,
        boxShadow,
      }}
    >
      {children}
    </div>
  )

Card.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.string,
  flexDirection: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  backgroundColor: PropTypes.string,
  minHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string
}

export default Card