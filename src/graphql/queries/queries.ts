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
        isMy
        total
      }
    }
  }
`;
