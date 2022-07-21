import { useState, ChangeEvent } from "react";
import Head from "next/head";
import style from "./styles.module.scss";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

import { FiUpload } from "react-icons/fi";

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

  //
  return (
    <>
      <Head>
        <title>New product - Pizzaria Beirã</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>New product</h1>

          <form className={style.form}>
            <label className={styles.avatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
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
                  alt="Avatar"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
            </select>

            <input
              type="text"
              placeholder="New product"
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Product price"
              className={styles.input}
            />

            <textarea
              placeholder="Product description..."
              className={styles.input}
            />

            <button className={styles.button} type="submit">
              Insert new product
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
export const getServerSideProps = canSSRauth(async (ctx) => {
  return {
    props: {},
  };
});
