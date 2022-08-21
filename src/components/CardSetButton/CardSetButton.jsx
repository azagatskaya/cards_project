import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardSetButton.module.scss";

function CardSetButton({ id, rus_name, handleSetSelect }) {
  return (
    <Link
      to="/study"
      key={rus_name}
      id={id}
      onClick={() => handleSetSelect(id)}
      className={styles.cardSetButton}
    >
      {rus_name}
    </Link>
  );
}

export default CardSetButton;
