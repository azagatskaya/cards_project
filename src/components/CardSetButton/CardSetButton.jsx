import React from "react";
import styles from "./CardSetButton.module.scss";

function CardSetButton({ id, rus_name, handleSetSelect }) {
  return (
    <div
      key={rus_name}
      id={id}
      onClick={() => handleSetSelect(id)}
      className={styles.cardSetButton}
    >
      {rus_name}
    </div>
  );
}

export default CardSetButton;
