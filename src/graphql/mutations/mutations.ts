import { gql } from '@apollo/client';

export const CREATE_REMIX = gql`
  mutation CreateRemix($payload: RemixCreateDTO!) {
    createRemix(payload: $payload) {
      isStore
    }
  }
`;

export const DELETE_REMIX = gql`
  mutation DeleteRemix($payload: RemixIdDTO!) {
    deleteRemix(payload: $payload)
  }
`;

export const UPDATE_REMIX = gql`
  mutation UpdateRemix($payload: RemixUpdateDTO!) {
    updateRemix(payload: $payload) {
      isStore
    }
  }
`;
