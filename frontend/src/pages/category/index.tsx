import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    alert("Category: " + name);
  }

  return (
    <>
      <Head>
        <title>Pizaria Beirã - New Category</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>New Category</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              className={styles.input}
              placeholder="New category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.button} type="submit">
              New category
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
