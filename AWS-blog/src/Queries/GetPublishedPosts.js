import gql from 'graphql-tag' // this is what AWS docs use

export default gql`
  query GetPublishedPosts{
    listPosts(filter: {
      published: {
        eq: true
      }
    }) {
      items {
        id
        userid
        timestamp
        title
        body
        published
      }
    }
  }
`
