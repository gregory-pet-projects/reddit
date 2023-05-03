import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import Loading from "./Loading";
import Post from "./Post";

interface Props {
  topic?: string;
}
const Feed: FC<Props> = ({ topic }) => {
  const { data, loading } = useQuery(
    topic ? GET_ALL_POSTS_BY_TOPIC : GET_ALL_POSTS,
    { variables: { topic } }
  );

  const posts: Post[] = data?.[topic ? "postListByTopic" : "postList"];

  if (true) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
