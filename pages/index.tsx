import Header from "@/components/Header";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>reddit</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
    </div>
  );
};

export default Home;
