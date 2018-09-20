import gql from 'graphql-tag' // this is what AWS docs use

export default gql`
  mutation CreateComment(
    $userid:ID!,
    $postid:ID!,
    $timestamp:String!,
    $body:String!
    ) {
    createComment(input:{
      userid:$userid,
      postid:$postid,
      timestamp:$timestamp
      body:$body
    }) {
      id
      userid
      postid
      timestamp
      body
    }
  }
`
