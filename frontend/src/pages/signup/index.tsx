import { useState, FormEvent, useContext } from "react";
import Head from "next/head";
import styles from "../../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../../public/logo.svg";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";

import Link from "next/link";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      alert("Please enter your username, email and password");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Pizzaria Beirã - Sign Up</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Pizzaria Beirã" />

        <div className={styles.login}>
          <h1>Sign Up</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
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
