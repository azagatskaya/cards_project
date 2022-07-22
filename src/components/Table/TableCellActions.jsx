import React from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  cellValue,
  rowId,
  onEditClick,
  onSaveClick,
  onDeleteClick,
  isEditable,
}) {
  const [newCellValue, setNewCellValue] = React.useState(cellValue);
  const [prevCellValue, setPrevCellValue] = React.useState(cellValue);

  const handleSaveClick = (e) => {
    onSaveClick();
  };
  const handleEditClick = (e) => {
    console.log(prevCellValue);
    console.log(newCellValue);
    console.log(isEditable);
    isEditable ? setNewCellValue(prevCellValue) : setNewCellValue(newCellValue);
    onEditClick();
  };
  const handleDeleteClick = (e) => {
    onDeleteClick();
  };

  let editBtnClasses;
  if (isEditable) {
    editBtnClasses = `${styles.button} ${styles.button_cancel}`;
  } else {
    editBtnClasses = `${styles.button} ${styles.button_edit}`;
  }

  return (
    <td className={`${styles.table__cell} ${styles.table__cellButtons}`}>
      <button
        className={styles.button + " " + styles.button_save}
        onClick={(e) => handleSaveClick(e)}
      ></button>
      <button
        className={editBtnClasses}
        onClick={(e) => handleEditClick(e)}
      ></button>
      <button
        className={styles.button + " " + styles.button_delete}
        onClick={(e) => handleDeleteClick(e)}
      ></button>
    </td>
  );
}
