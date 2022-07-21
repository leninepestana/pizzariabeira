import { useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";

import { Header } from "../../components/Header";

import { FiUpload } from "react-icons/fi";

import { setupAPIClient } from "../../services/api";

import Image from "next/image";

import { canSSRauth } from "../../utils/canSSRAuth";

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }
  return (
    <>
      <Head>
        <title>New Product - Pizzaria Beirã</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>New Product</h1>

        <form className={styles.form}>
          <label className={styles.avatar}>
            <span>
              <FiUpload size={25} color="#FFF" />
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
            />
            {avatarUrl && (
              <img
                className={styles.preview}
                src={avatarUrl}
                alt="Product picture"
                width={250}
                height={250}
              />
            )}
          </label>
          <select>
            <option>Bebidas</option>
            <option>Gelados</option>
            <option>Pizzas</option>
          </select>

          <input
            type="text"
            className={styles.input}
            placeholder="Product name"
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Product price"
          />
          <textarea
            placeholder="Product description"
            className={styles.input}
          />

          <button className={styles.button} type="submit">
            Create product
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRauth(async (ctx) => {
  return {
    props: {},
  };
});
