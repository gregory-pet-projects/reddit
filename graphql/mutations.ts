import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: ID!, $text: String!, $username: String!) {
    insertComment(post_id: $post_id, text: $text, username: $username) {
      id
      post_id
      text
      username
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $upvote: Boolean!, $username: String!) {
    insertVote(post_id: $post_id, upvote: $upvote, username: $username) {
      id
      post_id
      upvote
      username
      created_at
    }
  }
`;