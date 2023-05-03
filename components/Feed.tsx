import { GET_ALL_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Post from "./Post";

const Feed = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);

  const posts: Post[] = data?.postList;
  console.log({ data, posts });

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
