import React from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  rowId,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
  handleDelete,
  isEditable,
}) {
  const onEditClick = (e) => {
    isEditable ? handleCancelClick() : handleEditClick();
  };

  let editBtnClasses = `${styles.button}`;
  editBtnClasses = isEditable
    ? (editBtnClasses += ` ${styles.button_cancel}`)
    : (editBtnClasses += ` ${styles.button_edit}`);

  return (
    <td className={`${styles.table__cell} ${styles.table__cellButtons}`}>
      <button
        className={styles.button + " " + styles.button_save}
        onClick={handleSaveClick}
        data-btn-action={"save"}
      ></button>
      <button
        className={editBtnClasses}
        onClick={(e) => onEditClick(e)}
        data-btn-action={"edit"}
      ></button>
      <button
        className={styles.button + " " + styles.button_delete}
        onClick={() => handleDelete(rowId)}
        data-btn-action={"delete"}
      ></button>
    </td>
  );
}
