import React from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

// Components:
import CreatePost from './CreatePost'
import AllPosts from './AllPosts'
import SinglePost from './SinglePost'

const Routes = () => {
  return (
    <Switch>
      <Redirect exact path="/demos/awsblog" to="/posts" />
      <Route exact path="/demos/awsblog/posts" component={AllPosts} />
      <Route exact path="/demos/awsblog/posts/add" component={CreatePost} />
      <Route exact path="/demos/awsblog/posts/:postid" component={SinglePost} />
    </Switch>
  )
}

export default withRouter(Routes)
