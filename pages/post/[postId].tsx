import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { ADD_COMMENT } from "@/graphql/mutations";
import { GET_POST_BY_ID } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactTimeago from "react-timeago";

interface FormData {
  comment: string;
}
const defaultValues: FormData = {
  comment: "",
};
const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { loading, data } = useQuery(GET_POST_BY_ID, {
    variables: { post_id: router.query.postId },
  });
  const post: Post = data?.postById;
  const comments: CommentI[] = post?.comments;
  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues,
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, "postById"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading("Posting your comment...");
    try {
      await addComment({
        variables: {
          post_id: router.query.postId,
          text: data.comment,
          username: session?.user?.name,
        },
      });
      toast.success("Comment posted!", { id: notification });
      reset();
    } catch (err) {
      console.log("err", err);
      toast.error("Something went wrong!", { id: notification });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 sm:pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("comment", { required: true })}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please sign in to comment"
            }
          />
          <button
            type="submit"
            disabled={!watch("comment")}
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="relative flex items-center space-x-2 space-y-5"
          >
            <hr className="absolute top-10 h-16 border left-7 z-0 " />
            <div className="z-50">
              <Avatar seed={comment.username as string} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment.username} <ReactTimeago date={comment.created_at} />{" "}
                </span>
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
