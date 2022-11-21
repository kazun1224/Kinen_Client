import { CustomLayout } from "next";
import Head from "next/head";
import { HeaderComponent } from "src/layouts/header";
import { FooterComponent } from "src/layouts/footer";

export const Layout: CustomLayout = (props) => {
  return (
    <>
      <Head>
        <title>Kinen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderComponent/>
      <main className="py-20 md:py-32">{props.children}</main>
      <FooterComponent/>
    </>
  );
};
