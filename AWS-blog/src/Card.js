import React from 'react'
import PropTypes from 'prop-types'
import './styles/Card.css'

const Card = (component) => {


  return (
    <div className="card">
      {component()}
    </div>
  )
}

Card.propTypes = {
  component: PropTypes.object
}

export default Card
