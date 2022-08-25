import { useState } from "react";
import styles from "./Table.module.scss";
import TableCell from "./TableCell.jsx";
import TableCellActions from "./TableCellActions.jsx";

export default function TableRow({
  row,
  rowId,
  handleDelete,
  handleSaveChanges,
}) {
  const [initialCellValues, setInitialCellValues] = useState(row);
  const [cellValues, setCellValues] = useState(row);
  const [isRowEditable, setIsRowEditable] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const handleEditClick = () => {
    setIsRowEditable(true);
    setIsCanceled(false);
  };
  const handleCancelClick = () => {
    setIsRowEditable(false);
    setIsCanceled(true);
    setCellValues({ ...initialCellValues });
  };
  const handleSaveClick = () => {
    setIsRowEditable((prevState) => !prevState);
    handleSaveChanges(rowId, cellValues);
    setInitialCellValues(cellValues);
  };

  const handleInputBlur = (newValue) => {
    console.log("input blur");
    console.log(newValue);
    setCellValues((prevState) => {
      return { ...prevState, ...newValue };
    });
  };
  return (
    <tr className={styles.table__row}>
      {Object.entries(cellValues).map(([key, value]) => {
        return (
          <TableCell
            cellPropName={key}
            key={value.toString()}
            initialValue={value}
            rowId={rowId}
            isEditable={isRowEditable}
            isCanceled={isCanceled}
            handleInputBlur={handleInputBlur}
          />
        );
      })}
      <TableCellActions
        key={"row " + rowId.toString()}
        rowId={rowId}
        cellValue="actions"
        handleEditClick={handleEditClick}
        handleCancelClick={handleCancelClick}
        handleSaveClick={handleSaveClick}
        handleDelete={handleDelete}
        isEditable={isRowEditable}
      />
    </tr>
  );
}
