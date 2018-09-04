import React from 'react'

const Music = (props) => {
  return (
    props.music.map(item => {
      return (
        <h3 key={item.id} className="music">🎶  {item.album} by {item.artist} 🎶</h3>
      )
    })
  )
}

export default Music
