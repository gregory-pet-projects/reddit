import client from "@/apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "@/graphql/mutations";
import { GET_SUBREDDIT_BY_TOPIC } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Avatar from "./Avatar";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};
const defaultValues: FormData = {
  postTitle: "",
  postBody: "",
  postImage: "",
  subreddit: "",
};

const PostBox = () => {
  const { data: session } = useSession();
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
  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const onSubmit = handleSubmit(async (formData) => {
    console.log("formData", formData);
    const notification = toast.loading("Creating new post...");
    try {
      //Query for subreddit topic
      const {
        data: { subredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      const subredditExists = subredditListByTopic.length > 0;
      if (!subredditExists) {
        //create subreddit
        console.log("Subreddit is new! -> create new subreddit");
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });
        console.log("Creating post...", formData);
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image: formData.postImage,
            topic: formData.subreddit,
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        });
        console.log("New post created!", newPost);
      } else {
        // use existing subreddit
        console.log("Subreddit exists! -> use existing subreddit");
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image: formData.postImage,
            topic: formData.subreddit,
            subreddit_id: subredditListByTopic[0].id,
            username: session?.user?.name,
          },
        });
        console.log("New post created!", newPost);
      }

      reset();
      toast.success("New post created!", { id: notification });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: notification });
    }
  });

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
            session ? "Create a post by entering a title" : "Sign in to post"
          }
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6  cursor-pointer hover:text-gray-400 ${
            imageBoxOpen ? "text-blue-300" : "text-gray-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300 cursor-pointer hover:text-gray-400" />
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

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none rounded-md "
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="i.e r/AskReddit"
            />
          </div>
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
