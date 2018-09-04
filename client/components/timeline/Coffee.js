import React from 'react'

const Coffee = (props) => {

  return (
    props.coffees.map(coffee => {
      return (
        <h3 key={coffee.id} className="coffee">☕{coffee.name} from {coffee.roaster}☕</h3>
      )
    })
  )
}

export default Coffee
