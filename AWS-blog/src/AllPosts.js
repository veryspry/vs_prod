import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import * as moment from 'moment' // Date parser --> http://momentjs.com/docs/

import './styles/AllPosts.css'

import GetPublishedPosts from './Queries/GetPublishedPosts'

/*
  NOTE: Fix date issue as soon as I can get a proper date format into the DB

  Setup: https://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-react.html
*/


const AllPosts = (props) => {
  return (
    <div>
      <h2>All of the posts will go here</h2>
      <Query
        query={GetPublishedPosts}
        >
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading...</h1>
          if (error) return <h1>Error: {error}</h1>
          return data.listPosts.items.map(({ id, userid, title, timestamp }) => {
            return (
              <div
                className="post-wrapper"
                key={id}
                >
                <Link
                  to={`/posts/${id}`}>{title}</Link>
                <h4>written by: {userid}</h4>
                {timestamp && <p>posted on: {moment(timestamp).format("YYYY-MM-DD HH:mm")}</p>}
              </div>
            )
          })
        }}
      </Query>
    </div>
  )
}

export default AllPosts
