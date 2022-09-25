import React from 'react';
import styles from './Table.module.scss';

function TableButtonsOnAdd({
                               handleAddNewItem, handleClearAddField,
                           }) {
    return (
        <td className={styles.table__cellButtons}>
            <button
                className={`${styles.button} ${styles.button_cancel_add}`}
                onClick={handleClearAddField}
                data-action={'cancel'}
            ></button>
            <button
                className={styles.button + ' ' + styles.button_saveNewItem}
                onClick={handleAddNewItem}
                data-action={'delete'}
            ></button>
        </td>
    );
}

export default TableButtonsOnAdd;
