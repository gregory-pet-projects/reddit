import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";

import { unavailableActionToast } from "@/utils/service";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "../Avatar";
import { usePostBox } from "./usePostBox";

export interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

const defaultValues: FormData = {
  postTitle: "",
  postBody: "",
  postImage: "",
  subreddit: "",
};

interface Props {
  subreddit?: string;
}

const PostBox: FC<Props> = ({ subreddit }) => {
  const session = useSession()?.data as Session;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const { onSubmit } = usePostBox({ reset, session, handleSubmit, subreddit });
  return (
    <form
      className="sticky top-16 z-50 border rounded bg-white border-gray-300 p-2"
      onSubmit={onSubmit}
    >
      <div className="flex items-center space-x-3">
        <Avatar seed={session?.user?.name} />
        <input
          {...register("postTitle", { required: true })}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          disabled={!session}
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : "Create a post by entering a title"
              : "Sign in to post"
          }
        />

        <PhotographIcon
          onClick={() => session && setImageBoxOpen(!imageBoxOpen)}
          className={`h-6  cursor-pointer hover:text-gray-400 ${
            imageBoxOpen ? "text-blue-300" : "text-gray-300"
          }`}
        />
        <LinkIcon
          className="h-6 text-gray-300 cursor-pointer hover:text-gray-400"
          onClick={() => session && unavailableActionToast()}
        />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none rounded-md "
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none rounded-md "
                {...register("subreddit", { required: true })}
                type="text"
                placeholder="i.e r/AskReddit"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none rounded-md "
                {...register("postImage")}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors?.subreddit?.type === "required" && (
                <p className="">- A Subreddit is required</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-blue-400 p-2 text-white"
          >
            Create Post
          </button>
        </div>
      )}
    </form>
  );
};

export default PostBox;
