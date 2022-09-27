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
    const onEditClick = () => {
        isEditable ? handleCancelClick() : handleEditClick();
    };

    const editBtnClasses = isEditable ?
        (`${styles.button} ${styles.button_cancel}`) :
        (`${styles.button} ${styles.button_edit}`);

    return (
        <td>
            <div className={styles.table__cellButtons}>
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
                    onClick={() => handleDelete(rowId)}
                    data-action={'delete'}
                ></button>
            </div>
        </td>
    );
}
