import gql from 'graphql-tag' // this is what AWS docs use

export default gql`
  query GetPostComments($postid:ID!) {
    listComments(filter:{
      postid:{
        eq:$postid
      }
    }){
       items{
          id
          userid
          postid
          timestamp
          body
        }
      }
  }
`
