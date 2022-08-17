import { gql } from '@apollo/client';

export const GET_REMIXES = gql`
  query GetRemixes($payload: RemixGetDTO!) {
    remixes(payload: $payload) {
      items {
        authorEmail
        description
        genre
        id
        isStore
        name
        price
        trackLength
      }
      meta {
        total
      }
    }
  }
`;

export const GET_REMIX_BY_ID = gql`
  query GetRemixByID($payload: RemixIdDTO!) {
    remixById(payload: $payload) {
      authorEmail
      description
      genre
      id
      isStore
      name
      price
      trackLength
    }
  }
`;
