import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { GET_POST_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const PostPage = () => {
  const router = useRouter();
  const { loading, data } = useQuery(GET_POST_BY_ID, {
    variables: { post_id: router.query.postId },
  });

  const post: Post = data?.postById;

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
    </div>
  );
};

export default PostPage;
