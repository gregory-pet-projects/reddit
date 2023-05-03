import { GET_ALL_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Post from "./Post";

const Feed = () => {
  const { data } = useQuery(GET_ALL_POSTS);

  const posts: Post[] = data?.postList;
  console.log({ data, posts });
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
