import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
const PostBox = () => {
  const { data: session } = useSession();

  return (
    <form className="sticky top-16 z-50 border border-rounded bg-white border-gray-300 p-2">
      <div className="flex items-center space-x-3">
        <Avatar seed={session?.user?.name} />
        <input
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          disabled={!session}
          placeholder={
            session ? "Create a post by entering a title" : "Sign in to post"
          }
        />

        <PhotographIcon className={`h-6 text-gray-300 cursor-pointer`} />
        <LinkIcon className="h-6 text-gray-300 cursor-pointer" />
      </div>
    </form>
  );
};

export default PostBox;
