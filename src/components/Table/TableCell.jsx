import React from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  header,
  // cellValue,
  initialValue,
  onInputChange,
  handleInputBlur,
  isEditable,
  isCanceled,
}) {
  const [newCellValue, setNewCellValue] = React.useState(initialValue);
  const handleInputChange = (e) => {
    setNewCellValue(e.target.value);
  };
  const handleBlur = () => {
    console.log("new", newCellValue);
    console.log(handleInputBlur);
    handleInputBlur(newCellValue);
  };
  const value = isCanceled ? initialValue : newCellValue;
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
        value={value}
        type="text"
        size={isNaN(newCellValue.length) ? 4 : newCellValue.length - 1}
      />
    </td>
  );
}
