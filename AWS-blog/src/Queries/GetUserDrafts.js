import gql from 'graphql-tag' // this is what AWS docs use

export default gql`
  query GetUsersDrafts($userid:ID!){
    listPosts(filter:{
      published: {
        eq:false
      },
      userid: {
        eq:$userid
      }
    }){
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
