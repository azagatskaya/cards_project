import React from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  cellValue,
  onInputChange,
  onInputFocus,
  isEditable,
}) {
  const [newCellValue, setNewCellValue] = React.useState(cellValue);
  const [prevCellValue, setPrevCellValue] = React.useState(cellValue);
  const handleInputChange = (newValue) => {
    onInputChange(newValue);
    setNewCellValue(newValue);
    // console.log(newCellValue);
  };
  const handleInputFocus = (oldValue) => {
    onInputFocus(oldValue);
    setPrevCellValue(oldValue);
    // console.log("saved", oldValue);
  };

  return (
    <td className={styles.table__cell}>
      <input
        className={
          isEditable && !isNaN(newCellValue.length)
            ? `${styles.input} ${styles.input__editable}`
            : styles.input
        }
        type="text"
        value={newCellValue}
        // value={isEditable ? newCellValue : cellValue}
        onFocus={(e) => handleInputFocus(newCellValue)}
        onInput={(e) => handleInputChange(e.target.value)}
        size={isNaN(newCellValue.length) ? 4 : newCellValue.length - 1}
      />
    </td>
  );
}
