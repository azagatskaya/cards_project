import React from "react";
import styles from "./Table.module.scss";

export default function TableCell({ cellValue, id, onEditClick, isEditable }) {
  const [newCellValue, setNewCellValue] = React.useState(cellValue);
  let editBtnClasses;
  if (isEditable) {
    console.log("isEditable", isEditable);
    editBtnClasses = `${styles.button} ${styles.button_cancel}`;
  } else {
    editBtnClasses = `${styles.button} ${styles.button_edit}`;
  }

  return (
    <td className={styles.table__cell}>
      {cellValue === "actions" ? (
        <>
          <button className={styles.button + " " + styles.button_save}></button>
          {console.log("build btn", editBtnClasses)}
          <button
            className={editBtnClasses}
            onClick={() => onEditClick()}
          ></button>
          <button
            className={styles.button + " " + styles.button_delete}
          ></button>
        </>
      ) : isEditable ? (
        <input
          className={styles.input}
          type="text"
          value={newCellValue}
          onInput={(e) => setNewCellValue(e.target.value)}
          size={newCellValue.length - 1}
        />
      ) : (
        cellValue
      )}
    </td>
  );
}
