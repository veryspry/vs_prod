import React from 'react'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

// Components:
import CreatePost from './CreatePost'
import AllPosts from './AllPosts'
import SinglePost from './SinglePost'

const Routes = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/posts" />
      <Route exact path="/posts" component={AllPosts} />
      <Route exact path="/posts/add" component={CreatePost} />
      <Route exact path="/posts/:postid" component={SinglePost} />
    </Switch>
  )
}

export default withRouter(Routes)
