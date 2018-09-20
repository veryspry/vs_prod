import React from 'react'
import { Query, Mutation } from 'react-apollo'

import GetPost from './Queries/GetPost'
import CreateComment from './Mutations/CreateComment'

import CommentList from './CommentList'
import PostNameList from './PostNameList'

import './styles/SinglePost.css'

// Apollo cache needs to auto updated on comment post...
// Otherwise, you will need to refresh to see the new comment

const singlePost = (props) => {
  let postid = props.match.params.postid
  return (
    <div className="single-post-wrapper">

      <PostNameList />

      <div className="post-detail">
        <Query
          query={GetPost}
          variables={{ id: postid }}
          >
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>
            // if (error) return <h1>Error: {error}</h1>
            if (error) {
              console.log(error)
              return <h1>Error</h1>
            }
            let post = data.getPost
            return (
              <div>
                <img src={post.imageUrl ? post.imageUrl : "/img/default.jpg"} alt=""/>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            )
          }}
        </Query>

        <Mutation
          mutation={CreateComment}
          variables={{ postid: postid }}
          >
          {createComment => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createComment({ variables: {
                    userid: 1, // currently hardcoded to one user
                    postid: postid,
                    timestamp: (new Date()).toISOString(),
                    body: this.body.value || '',
                  }});
                  this.body.value = '';
                }}
                >
                <div className="input-wrapper">
                  <label htmlFor="body">Comment:</label>
                  <input
                    id="body"
                    type="text"
                    ref={node => this.body = node}
                  />
                </div>
                <div className="btn-wrapper">
                  <button type="submit" >Post Comment</button>
                </div>
              </form>
            )}
        </Mutation>

        <CommentList postid={props.match.params.postid}/>
      </div>
    </div>
  )
}

export default singlePost
