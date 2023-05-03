import client from "@/apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "@/graphql/mutations";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { FormData } from "./PostBox";

interface Props {
  reset: () => void;
  session: Session;
  handleSubmit: any;
}
export const postBoxHook = ({ reset, session, handleSubmit }: Props) => {
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "postList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const getQuerySubredditTopic = async (formData: FormData) => {
    const {
      data: { subredditListByTopic },
    } = await client.query({
      query: GET_SUBREDDIT_BY_TOPIC,
      variables: {
        topic: formData.subreddit,
      },
    });
    return subredditListByTopic;
  };

  const createSubreddit = async (formData: FormData) => {
    console.log("Subreddit is new! -> create new subreddit");
    const {
      data: { insertSubreddit: newSubreddit },
    } = await addSubreddit({
      variables: {
        topic: formData.subreddit,
      },
    });
    return newSubreddit;
  };

  const createPost = async (formData: FormData, subreddit_id: string) => {
    console.log("Creating post...", formData);
    const {
      data: { insertPost: newPost },
    } = await addPost({
      variables: {
        title: formData.postTitle,
        body: formData.postBody,
        image: formData.postImage,
        topic: formData.subreddit,
        subreddit_id: subreddit_id,
        username: session?.user?.name,
      },
    });
    console.log("New post created!", newPost);
  };

  const onSubmit = handleSubmit(async (formData: FormData) => {
    const notification = toast.loading("Creating new post...");
    try {
      //Query for subreddit topic
      const subredditListByTopic = await getQuerySubredditTopic(formData);

      const subredditExists = subredditListByTopic.length > 0;
      let subreddit_id = null;
      if (subredditExists) {
        // use existing subreddit
        console.log("Subreddit exists! -> use existing subreddit");
        subreddit_id = subredditListByTopic[0].id;
      } else {
        //create subreddit
        const newSubreddit = await createSubreddit(formData);
        subreddit_id = newSubreddit.id;
      }

      const newPost = createPost(formData, subreddit_id);
      console.log("New post created!", newPost);
      reset();
      toast.success("New post created!", { id: notification });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: notification });
    }
  });
  return { onSubmit };
};
