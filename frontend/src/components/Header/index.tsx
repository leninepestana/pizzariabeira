import { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { signOut } = useContext(AuthContext);
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <picture>
            <source srcSet="/logo.svg" type="" />
            <img src="/logo.svg" alt="Pizzaria Beirã" width={190} height={60} />
          </picture>
        </Link>
        <nav className={styles.menuNav}>
          <Link href="/category">
            <a>Category</a>
          </Link>

          <Link href="/product">
            <a>Menu</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
