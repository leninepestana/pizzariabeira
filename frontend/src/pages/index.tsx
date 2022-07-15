import Head from "next/head";
import styles from "../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../public/logo.svg";
import { Input } from "../components/ui/Input";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria Beirã - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Pizzaria Beirã" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Insert your email" type="text" />
            <Input placeholder="Insert your password" type="password" />
          </form>
        </div>
      </div>
    </>
  );
}
