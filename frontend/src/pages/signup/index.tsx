import Head from "next/head";
import styles from "../../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../../public/logo.svg";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Pizzaria Beirã - Sign Up</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Pizzaria Beirã" />

        <div className={styles.login}>
          <h1>Sign Up</h1>
          <form>
            <Input placeholder="Username" type="text" />
            <Input placeholder="Email" type="text" />
            <Input placeholder="Password" type="password" />
            <Button type="submit" loading={false}>
              Register
            </Button>
            <Link href="/">
              <a className={styles.text}>Do you have account? Login</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
