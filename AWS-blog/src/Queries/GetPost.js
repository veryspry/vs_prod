import gql from 'graphql-tag' // this is what AWS docs use

export default gql`
  query GetPost($id:ID!) {
    getPost(id:$id) {
        id
        userid
        timestamp
        title
        body
        imageUrl
        published
    }
  }
`
