import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/category", { name: name });

    toast.success("New category was created");
    setName("");
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
