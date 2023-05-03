import Communities from "@/components/Communities";
import Feed from "@/components/Feed";
import PostBox from "@/components/PostBox/PostBox";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-2 md:my-7 mx-auto">
      <Head>
        <title>Reddit 2.0</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <PostBox />
      <div className="flex sm:px-10">
        <Feed />
        <Communities />
      </div>
    </div>
  );
};

export default Home;
