import PostBox from "@/components/PostBox/PostBox";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit Home Page</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <PostBox />
    </div>
  );
};

export default Home;
