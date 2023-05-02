import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import Avatar from "./Avatar";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type InputProps = {
  label: string;
  register: UseFormRegister<FormData>;
  name: "postTitle" | "postBody" | "postImage" | "subreddit";
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const Input = ({
  label,
  register,
  name,
  type = "text",
  placeholder,
  required = false,
}: InputProps) => {
  return (
    <div className="flex items-center px-2">
      <p className="min-w-[90px]">{label}:</p>
      <input
        {...(register(name), { required })}
        className="m-2 flex-1 bg-blue-50 p-2 outline-none rounded-md "
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

const PostBox = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (formData) => {
    console.log("formData", formData);
    reset();
  });
  console.log("imageBoxOpen", imageBoxOpen);
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
