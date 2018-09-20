import React from 'react'
import { Query } from 'react-apollo'
// Date parser --> http://momentjs.com/docs/
import * as moment from 'moment'

import GetPostComments from './Queries/GetPostComments'

import './styles/CommentList.css'

const CommentList = (props) => {
  let postid = props.postid
  return (
    <div className="comments-on-post">
      <Query
        query={GetPostComments}
        variables={{ postid }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>
            // if (error) return <h1>Error: {error}</h1>
            if (error) {
              console.log(error)
              return <h1>Error</h1>
            }
            // Client side comment sort by post datetime
            // Apollo Cache is read-only...
            // copy comment array and sort by timestamp
            const sortArr = []
            data.listComments.items.forEach(e => sortArr.push(e))
            sortArr.sort((a, b) => {
              if (a.timestamp < b.timestamp) return -1
              if (a.timestamp > b.timestamp) return 1
              return 0
            })
            return sortArr.map(({ id, userid, postid, timestamp, body }) => {
              return (
                <div key={id} className="comment-wrapper">
                  <p>{body}</p>
                  <p>posted by: {userid}</p>
                  {timestamp && <p>posted on: {moment(timestamp).format("YYYY-MM-DD HH:mm")}</p>}
                </div>
              )
            })
          }}
      </Query>
    </div>
  )
}

export default CommentList
