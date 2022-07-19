import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import styles from "../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../public/logo.svg";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { toast } from "react-toastify";

import { canSSRGuest } from "../utils/canSSRGuest";

import { AuthContext } from "../contexts/AuthContext";

import { GetServerSideProps } from "next";

import Link from "next/link";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      // alert("Please enter your email address and password");
      toast.warning("Please enter your email address and password");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Pizzaria Beirã - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Pizzaria Beirã" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Insert your email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Insert your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Login
            </Button>
            <Link href="/signup">
              <a className={styles.text}>Do you have account? Sign up</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return { props: {} };
});
