import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    subredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query MyQuery {
    postList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      comments {
        created_at
        post_id
        id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
      subreddit {
        created_at
        id
        topic
      }
    }
  }
`;


export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    postListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      comments {
        created_at
        post_id
        id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
      subreddit {
        created_at
        id
        topic
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query MyQuery($post_id: String!) {
    postById(post_id: $post_id) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      comments {
        created_at
        post_id
        id
        text
        username
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
      subreddit {
        created_at
        id
        topic
      }
    }
  }
`;


export const GET_ALL_QUOTES_BY_POST_ID = gql`
  query MyQuery($post_id: String!) {
    voteListById(post_id: $post_id) {
      created_at
      id
      post_id
      username
      upvote
    }
  }
`;