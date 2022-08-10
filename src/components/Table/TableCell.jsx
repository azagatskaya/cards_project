import React from "react";
import styles from "./Table.module.scss";

export default function TableCell({
  header,
  cellValue,
  onInputChange,
  initialValue,
  isEditable,
  isCanceled,
}) {
  console.log(cellValue);
  const [newCellValue, setNewCellValue] = React.useState(cellValue);
  // const [prevCellValue, setPrevCellValue] = React.useState(cellValue);

  const handleInputChange = (newValue) => {
    onInputChange(newValue, header);
    setNewCellValue(newValue);
    console.log("new", newCellValue);
  };
  // const handleInputFocus = (oldValue) => {
  //   onInputFocus(oldValue);
  //   setPrevCellValue(oldValue);
  //   console.log("old", oldValue);
  // };
  // console.log("cell", isCanceled);
  // console.log("new", newCellValue);
  // console.log("old", prevCellValue);
  return (
    <td className={styles.table__cell}>
      <div
        contentEditable={isEditable}
        className={
          isEditable && !isNaN(newCellValue.length)
            ? `${styles.input} ${styles.input__editable}`
            : styles.input
        }
        type="text"
        // value={newCellValue}
        // value={isEditable ? newCellValue : cellValue}
        // onFocus={(e) => handleInputFocus(newCellValue)}
        // onInput={(e) => handleInputChange(e.target.value)}
        // onClick={(e) => handleInputChange(e.target.value)}
        size={isNaN(newCellValue.length) ? 4 : newCellValue.length - 1}
      >
        {isCanceled ? initialValue : newCellValue}
        {/* {newCellValue} */}
      </div>
    </td>
  );
}
