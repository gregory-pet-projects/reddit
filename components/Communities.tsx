import { GET_SUBREDDIT_WITH_LIMITS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import SubredditRow from "./SubredditRow";

const Communities = () => {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMITS, {
    variables: { limit: 10 },
  });
  const subreddits: Subreddit[] = data?.subredditListLimit;
  if (subreddits.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
      <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
      <div>
        {subreddits?.map(({ id, topic }, idx) => (
          <SubredditRow key={id} idx={idx} topic={topic as string} />
        ))}
      </div>
    </div>
  );
};

export default Communities;
