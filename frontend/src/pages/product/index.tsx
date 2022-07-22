import { useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";

import { Header } from "../../components/Header";

import { FiUpload } from "react-icons/fi";

import { setupAPIClient } from "../../services/api";

import { canSSRAuth } from "../../utils/canSSRAuth";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.files);
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

          <select value={categorySelected}>
            {categories.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/category");
  // console.log(response.data);
  return {
    props: {
      categoryList: response.data,
    },
  };
});
