import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Authentication from "../Auth/Auth.jsx";

function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}></div>
      </Link>
      <Authentication />
    </div>
  );
}
export default Header;
