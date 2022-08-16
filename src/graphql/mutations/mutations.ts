import { gql } from '@apollo/client';

export const CREATE_REMIX = gql`
  mutation CreateRemix($payload: RemixCreateDTO!) {
    createRemix(payload: $payload) {
      name
      description
      id
      createdDate
    }
  }
`;

export const DELETE_REMIX = gql`
  mutation DeleteRemix($payload: RemixIdDTO!) {
    deleteRemix(payload: $payload)
  }
`;
