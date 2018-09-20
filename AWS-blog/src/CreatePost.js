import React from 'react'
import { Mutation } from 'react-apollo'

import './styles/CreatePost.css'

import CreatePostQuery from './Mutations/CreatePost'

// title
// image URL
// body
// status (draft OR published)


const CreatePost = () => {

  let published = false
  let message = ''

  return (

    <Mutation mutation={CreatePostQuery}>
      {(addPost, { data }) => (
        <div className="card">
          <form
            onSubmit={e => {
              e.preventDefault();
              addPost({ variables: {
                userid: 1, // currently hardcoded to one user
                timestamp: (new Date()).toISOString(),
                title: this.title.value || '',
                body: this.body.value || '',
                imageUrl: this.imageUrl.value === '' ? '/img/default.jpg' : this.imageUrl.value,
                published,
              }});
              if (published) {
                this.title.value = '';
                this.body.value = '';
                this.imageUrl.value = '';
              }
            }}
            >
            <h3>Create a new blog post</h3>
            {message.length > 0 && message}
            <div className="input-wrapper">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                ref={node => this.title = node}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                id="imageUrl"
                type="text"
                ref={node => this.imageUrl = node}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="body">Body</label>
              <textarea
                id="body"
                type="text"
                ref={node => this.body = node}
                className="input-post-body"
              />
            </div>
            <div className="btn-wrapper">
              <button
                onClick={() => {
                  published = false
                  message = 'Draft Saved!'
                }}
                type="submit"
              >Save Draft</button>
              <button
                onClick={() => {
                  published = true
                  message = 'Success!'
                }}
                type="submit"
              >Publish</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}



export default CreatePost
