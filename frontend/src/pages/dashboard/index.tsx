import { canSSRauth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Pizzaria Beirã</title>
      </Head>
      <div>
        <Header />
        <h1>Dashboard</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRauth(async (ctx) => {
  return { props: {} };
});
