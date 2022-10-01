import React, {useEffect, useState} from 'react';
import styles from './Table.module.scss';

export default function TableCell({
                                      cellPropName,
                                      initialValue,
                                      handleInputBlur,
                                      isRowEditable,
                                      isCanceled,
                                      isValid
                                  }) {
    const [newCellValue, setNewCellValue] = useState(initialValue);
    const [isEmpty, setIsEmpty] = useState(false);
    const [style, setStyle] = useState();

    useEffect(() => {
        if (!isValid && newCellValue === '') setIsEmpty(true);
    }, [isValid])

    useEffect(() => {
        setStyle(!isEmpty ?
            `${styles.input} ${styles.input__editable}` :
            `${styles.input} ${styles.input__editable} ${styles.input__alarmed}`);
    }, [isEmpty])

    useEffect(() => {
        setNewCellValue(initialValue);
        isCanceled ? setIsEmpty(false) : null;
    }, [initialValue, isCanceled]);

    const handleInputChange = (e) => {
        setIsEmpty(e.target.value.trim() === '' ? true : false);
        setNewCellValue(e.target.value);
    };

    const handleBlur = (e) => {
        handleInputBlur({
            [cellPropName]: e.target.value
        });
        setIsEmpty(e.target.value.trim() === '' ? true : false);
    };

    const isCellEditable =
        isRowEditable &&
        cellPropName !== 'id' &&
        cellPropName !== 'numberOfCards' &&
        cellPropName !== 'date';

    const content = isCellEditable ?
        <input
            className={style}
            onChange={handleInputChange}
            onBlur={handleBlur}
            value={newCellValue}
            type='text'
        /> : newCellValue;

    return (
        <td className={cellPropName === 'id' ? styles.table__cell + ' ' + styles.table__cell_id : styles.table__cell}>
            {content}
        </td>
    );
}
