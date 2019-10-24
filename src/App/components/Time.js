import PropTypes from 'prop-types'
import React from 'react'

const Time = ({
  point
}) => (
    <div style={{
      margin: '0 10px',
      padding: '5px 10px',
      backgroundColor: 'blueviolet',
      color: 'white',
      fontWeight: '500'
    }}>
      {point.time}
    </div>
  )

Time.propTypes = {
  point: PropTypes.object
}

export default Time