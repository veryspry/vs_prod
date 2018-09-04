import React from 'react'

const Resources = (props) => {
  return (
    props.resources.map(resource => {
      return (
          <a key={resource.id} href={resource.resourceUrl} target="_blank">
            <h3 className="cool-things">{resource.name} </h3>
          </a>
      )
    })
  )
}

  export default Resources
