import gql from "graphql-tag";

export const GET_ILLUVIALS = gql`
  {
    queryIlluvial {
      id
      name
      stage
      class
      affinity
      pic
      range
      genus
      tier
    }
  }
`;

export const ADD_ILLUVIAL = gql`
  mutation addIlluvial($input: [AddIlluvialInput!]!) {
    addIlluvial(input: $input) {
      illuvial {
        id
        name
        stage
        class
        affinity
        pic
        range
        genus
        tier
      }
    }
  }
`;

export const UPDATE_ILLUVIAL = gql`
  mutation updateIlluvial($input: UpdateIlluvialInput!) {
    updateIlluvial(input: $input) {
      illuvial {
        id
        name
        stage
        class
        affinity
        pic
        range
        genus
        tier
      }
    }
  }
`;

export const DELETE_ILLUVIAL = gql`
  mutation deleteIlluvial($id: [ID!]) {
    deleteIlluvial(filter: { id: $id }) {
      msg
    }
  }
`;
