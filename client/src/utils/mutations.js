import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_TITLE = gql`
  mutation saveTitle($input: TitleInput!) {
    saveTitle(input: $input) {
      _id
      username
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

export const REMOVE_TITLE = gql`
  mutation removeTitle($imdbID: ID!) {
    removeTitle(imdbID: $imdbID) {
      _id
      username
      savedTitles {
        imdbID
        title
      }
    }
  }
`;