import { GET_ALL_QUOTES_BY_POST_ID } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";

import { ADD_VOTE } from "@/graphql/mutations";
import { unavailableActionToast } from "@/utils/service";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactTimeago from "react-timeago";
import Avatar from "./Avatar";
import Loading from "./Loading";

interface Props {
  post: Post;
}

const Post: FC<Props> = ({ post }) => {
  const [vote, setVote] = useState<boolean | null>(null);
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_ALL_QUOTES_BY_POST_ID, {
    variables: { post_id: post.id },
  });
  const votes: Vote[] = data?.voteListById;

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_QUOTES_BY_POST_ID, "voteListById"],
  });
  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast.error("You must be signed in to vote");
      return;
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    const notification = toast.loading("Voting...");
    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
    toast.success("Voted!", { id: notification });
  };

  useEffect(() => {
    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;
    console.log("vote===>", vote);
    if (vote !== undefined) {
      setVote(vote as boolean);
    }
  }, [data]);

  const displayVotes = (votes: Vote[]) => {
    const displayNumber = votes?.reduce((total, vote) => {
      return vote.upvote ? total + 1 : total - 1;
    }, 0);
    return displayNumber;
  };

  if (!post) {
    return <Loading />;
  }
  return (
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon
          onClick={() => upVote(true)}
          className={`voteButton hover:text-red-400 ${vote && "text-red-400"}`}
        />
        <p className="text-black font-bold text-xs">{displayVotes(votes)}</p>
        <ArrowDownIcon
          onClick={() => upVote(false)}
          className={`voteButton hover:text-blue-400 ${
            vote === false && "text-blue-400"
          }`}
        />
      </div>

      <div className="p-3 pb-1">
        {/* Header */}
        <Link href={`post/${post.id}`}>
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              • Posted by u/
              {post.username} <ReactTimeago date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className="p-y">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {/* Image */}
          {post?.image && (
            <img
              className="w-full"
              alt="post image"
              src={post.image.toString()}
            />
          )}
        </Link>
        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <ChatAltIcon className="h-6 w-6" />
            <p className="">
              {post.comments.length}{" "}
              <span className="hidden sm:inline">Comments</span>
            </p>
          </div>

          <div className="postButtons" onClick={unavailableActionToast}>
            <GiftIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Award</p>
          </div>

          <div className="postButtons" onClick={unavailableActionToast}>
            <ShareIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Share</p>
          </div>

          <div className="postButtons" onClick={unavailableActionToast}>
            <BookmarkIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Save</p>
          </div>

          <div className="postButtons" onClick={unavailableActionToast}>
            <DotsHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
