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

  console.log('updated cell', newCellValue);
  const handleInputChange = (e) => {
    setNewCellValue(e.target.value);
  };

  useEffect(() => {
    console.log('isCanceled changed: setNewCellValue =', initialValue);
    setNewCellValue(initialValue);
  }, [isCanceled]);

  const handleBlur = (e) => {
    handleInputBlur({[cellPropName]: e.target.value});
  };

  const isCellEditable =
        isRowEditable &&
        cellPropName !== 'id' &&
        cellPropName !== 'numberOfCards' &&
        cellPropName !== 'date';

  return (
    <td className={styles.table__cell}>
      <input
        disabled={!isCellEditable}
        className={isCellEditable ?
                    `${styles.input} ${styles.input__editable}` :
                    styles.input
        }
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={newCellValue}
        type="text"
      />
    </td>
  );
}
