import React, {useContext} from 'react';
import {WordsContext} from "../../context/wordsContext";
import styles from './Table.module.scss';

export default function TableCellActions({
                                             rowId,
                                             handleEditClick,
                                             handleCancelClick,
                                             handleSaveClick,
                                             isEditable,
                                         }) {
    const {changeData} = useContext(WordsContext);
    const editBtnClasses = isEditable ?
        (`${styles.button} ${styles.button_cancel}`) :
        (`${styles.button} ${styles.button_edit}`);

    const onEditClick = () => {
        isEditable ? handleCancelClick() : handleEditClick();
    };

    return (
        <td className={styles.table__cell_wrapper}>
            <div className={styles.table__cell_buttons}>
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
                    onClick={() => changeData(rowId)}
                    data-action={'delete'}
                ></button>
            </div>
        </td>
    );
}
