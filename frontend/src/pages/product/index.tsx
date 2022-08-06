import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";

import { Header } from "../../components/Header";

import { FiUpload } from "react-icons/fi";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { setupAPIClient } from "../../services/api";

import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  // console.log(categoryList);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategory] = useState(categoryList || []);
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

  // When you select a new category from the list
  function handleChangeCategory(event) {
    // console.log("Category position", event.target.value);
    // console.log("Selected Category: ", categories[event.target.value]);
    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("You need to provide all fields");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post("/product", data);

      toast.success("New Product created");
    } catch (err) {
      console.log(err);
      toast.error("Error creating product");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
  }

  return (
    <>
      <Head>
        <title>New Product - Pizzaria Beirã</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>New Product</h1>

        <form className={styles.form} onSubmit={handleRegister}>
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

          <select value={categorySelected} onChange={handleChangeCategory}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Product description"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
      categoryList: response.data?.category,
    },
  };
});
