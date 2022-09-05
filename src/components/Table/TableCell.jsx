import { useEffect, useState } from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  cellPropName,
  initialValue,
  isFieldEditable,
  handleInputBlur,
  isRowEditable,
  isCanceled,
}) {
  const [newCellValue, setNewCellValue] = useState(initialValue);

  const handleInputChange = (e) => {
    setNewCellValue(e.target.value);
  };

  useEffect(() => {
    setNewCellValue(initialValue);
  }, [isCanceled]);

  const handleBlur = (e) => {
    handleInputBlur({ [cellPropName]: e.target.value });
  };

  const isCellEditable =
    isRowEditable &&
    cellPropName !== "id" &&
    cellPropName !== "numberOfCards" &&
    cellPropName !== "date";
  return (
    <td className={styles.table__cell}>
      <input
        disabled={!isCellEditable}
        className={
          isCellEditable
            ? `${styles.input} ${styles.input__editable}`
            : styles.input
        }
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={newCellValue}
        type="text"
        size={
          newCellValue.length < 4 || isNaN(newCellValue.length)
            ? 4
            : newCellValue.length - 1
        }
      />
    </td>
  );
}
