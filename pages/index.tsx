import PostBox from "@/components/PostBox";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit Home Page</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <PostBox />
    </div>
  );
};

export default Home;
