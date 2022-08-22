import { useEffect, useState } from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  cellPropName,
  initialValue,
  handleInputBlur,
  isEditable,
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
    console.log("new", newCellValue);
    console.log(handleInputBlur);
    // if (!isCanceled) {
    handleInputBlur({ [cellPropName]: e.target.value });
    // }
  };
  // const value = isCanceled ? initialValue : newCellValue;
  return (
    <td className={styles.table__cell}>
      <input
        disabled={!isEditable}
        className={
          isEditable && !isNaN(newCellValue.length)
            ? `${styles.input} ${styles.input__editable}`
            : styles.input
        }
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={newCellValue}
        type="text"
        size={isNaN(newCellValue.length) ? 4 : newCellValue.length - 1}
      />
    </td>
  );
}
