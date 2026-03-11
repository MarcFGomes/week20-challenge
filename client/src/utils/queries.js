import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      titleCount
      savedTitles {
        imdbID
        title
        year
        type
        poster
        plot
        imdbRating
        imdbLink
      }
    }
  }
`;