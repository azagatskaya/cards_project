import React from "react";
import styles from "../Table/Table.module.scss";

export default function TableCell({ value, rowId, onEditClick, isEditable }) {
  return (
    <td className={styles.table__cell} contentEditable={isEditable}>
      {value !== "actions" ? (
        value
      ) : (
        <>
          <button className={styles.button + " " + styles.button_save}></button>
          <button
            className={styles.button + " " + styles.button_edit}
            onClick={() => onEditClick(rowId)}
          ></button>
          <button
            className={styles.button + " " + styles.button_delete}
          ></button>
        </>
      )}
    </td>
  );
}
