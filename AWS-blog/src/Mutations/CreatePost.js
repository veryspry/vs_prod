import gql from 'graphql-tag' // this is what AWS docs use

export default gql`
  mutation CreatePost(
    $userid:ID!,
    $timestamp:String!,
    $title:String!,
    $body:String!,
    $published:Boolean!,
    $imageUrl:String!
    ) {
    createPost(input: {
        userid:$userid,
        timestamp:$timestamp,
        title:$title,
        body:$body,
        published:$published,
        imageUrl:$imageUrl
    }) {
      id
      userid
      timestamp
      title
      body
      published
    }
  }
`
