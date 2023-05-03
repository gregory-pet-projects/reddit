type Vote = {
  username: String;
  upvote: Boolean;
  post_id: ID;
  id: ID!;
  created_at: DateTime;
};

type Comment = {
  username: String;
  text: String;
  post_id: ID;
  id: ID!;
  created_at: DateTime;
};

type Subreddit = {
  topic: String;
  id: ID!;
  created_at: DateTime;
};

type Post = {
  username: String;
  title: String;
  subreddit_id: ID;
  image: String;
  id: ID!;
  created_at: DateTime;
  body: String;
  votes: Vote[];
  comments: Comment[];
  subreddit: Subreddit[];
};
