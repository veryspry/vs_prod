import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import GetPublishedPosts from './Queries/GetPublishedPosts'

const PostNameList = () => {

  return (
    <div className="post-name-list">
      <h2>Post List:</h2>
      <Query query={GetPublishedPosts}>

        { ({ loading, error, data }) => {
          if (loading) return <h1>Loading...</h1>
          if (error) {
            console.log('Error:', error);
            return <h1>Error Loading</h1>
          }

          return data.listPosts.items.map(({ id, title }) => {
            return (
              <div key={id}>
                <Link to={`/posts/${id}`} >
                  {title}
                </Link>
              </div>

            )
          })
        }}

      </Query>
    </div>
  )
}

// {/* <Link to={`/posts/${id}`} key={id}>
//   <p>{title}</p>
// </Link> */}

export default PostNameList
