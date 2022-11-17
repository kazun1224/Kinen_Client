import { CustomLayout } from "next";
import Head from "next/head";

export const Layout: CustomLayout = (props) => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-20 md:py-32">{props.children}</main>
    </>
  );
};
