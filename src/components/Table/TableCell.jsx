import React, {useEffect, useState} from 'react';
import styles from './Table.module.scss';

export default function TableCell({
                                      cellPropName,
                                      initialValue,
                                      handleInputBlur,
                                      isRowEditable,
                                      isCanceled,
                                  }) {
    const [newCellValue, setNewCellValue] = useState(initialValue);

    useEffect(() => {
        setNewCellValue(initialValue);
    }, [initialValue, isCanceled]);

    const handleInputChange = (e) => {
        setNewCellValue(e.target.value);
    };

    const handleBlur = (e) => {
        handleInputBlur({
            [cellPropName]: e.target.value
        });
    };

    const isCellEditable =
        isRowEditable &&
        cellPropName !== 'id' &&
        cellPropName !== 'numberOfCards' &&
        cellPropName !== 'date';

    const content = isCellEditable ?
        <input
            className={`${styles.input} ${styles.input__editable}`}
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
