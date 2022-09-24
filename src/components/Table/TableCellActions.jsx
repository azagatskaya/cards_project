import React from 'react';
import styles from './Table.module.scss';

export default function TableCellActions({
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
  editBtnClasses = isEditable ?
        (editBtnClasses += ` ${styles.button_cancel}`) :
        (editBtnClasses += ` ${styles.button_edit}`);

  return (
    <td className={styles.table__cellButtons}>
      <button
        className={styles.button + ' ' + styles.button_save}
        onClick={handleSaveClick}
        data-action={'save'}
      ></button>
      <button
        className={editBtnClasses}
        onClick={(e) => onEditClick(e)}
        data-action={'edit'}
      ></button>
      <button
        className={styles.button + ' ' + styles.button_delete}
        onClick={(e) => handleDelete(rowId)}
        data-action={'delete'}
      ></button>
    </td>
  );
}
