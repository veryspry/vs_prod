import gql from 'graphql-tag' // this is what AWS docs use
// import gql from 'apollo-boost' // this is what I have used before --> what is the difference?

export default gql`
  query GetPosts {
      listPosts {
        items {
          id
          userid
          timestamp
          title
          body
          imageUrl
          published
        }
      }
    }
`
// export default gql`
//   query AllPosts {
//     listBlogs {
//       items {
//          __id
//         timestamp
//         userid
//         title
//         body
//         status
//         comments {
//           userid
//           timestamp
//           body
//         }
//       }
//     }
//   }
// `
