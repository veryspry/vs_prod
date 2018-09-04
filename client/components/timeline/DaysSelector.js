import React from 'react'
// import { addDay } from '../../redux/actions''

const DaysSelector = props => {
    return (
      <select name={props.name} onChange={props.handleChange}>
        <option value="title">--Select day--</option>
        {props.timeline.map(day => {
          return (
            <option value={day.id} key={day.id}>{day.month} {day.day}, {day.year}</option>
          )
        })}
      </select>
    )

}

export default DaysSelector
