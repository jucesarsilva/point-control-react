import PropTypes from 'prop-types'
import React from 'react'

const TableDay = ({
  children,
  padding = '0'
}) => (
    <ul style={{
      padding,
      margin: 0
    }}>
      {children}
    </ul>
  )

TableDay.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
}

export default TableDay