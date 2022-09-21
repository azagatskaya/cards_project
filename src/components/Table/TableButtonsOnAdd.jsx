import React from "react";
import styles from "./Table.module.scss";

export default function TableButtonsOnAdd({
  rowId,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
  handleDelete,
  isEditable,
}) {
  const onCancelClick = (e) => {
    isEditable ? handleCancelClick() : handleEditClick();
  };
const handleSaveNewItem = () => {

}

  return (
    <td className={`${styles.table__cell} ${styles.table__cellAddButtons}`}>
      <button
        className={`${styles.button} ${styles.button_cancel}`}
        onClick={(e) => onCancelClick(e)}
        data-action={"cancel"}
      ></button>
      <button
        className={styles.button + " " + styles.button_saveNewItem}
        onClick={(e) => handleSaveNewItem(rowId)}
        data-action={"delete"}
      ></button>
    </td>
  );
}
