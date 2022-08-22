import { useState } from "react";
import styles from "./Table.module.scss";
import TableCell from "./TableCell.jsx";
import TableCellActions from "./TableCellActions.jsx";

export default function TableRow({
  row,
  rowId,
  onDelete,
  handleSaveChanges,
  cellPropNames,
}) {
  const [cellValues, setCellValues] = useState(row);
  const [isRowEditable, setIsRowEditable] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const handleEditClick = () => {
    console.log("edit click");
    setIsRowEditable(true);
    setIsCanceled(false);
  };
  const handleCancelClick = () => {
    console.log("cancel click");
    setIsRowEditable(false);
    setIsCanceled(true);
  };
  const handleSaveClick = (newValue) => {
    console.log("save click");
    setIsRowEditable((prevState) => !prevState);
    handleSaveChanges(rowId, cellValues);
  };
  const handleDeleteClick = (rowId) => {
    console.log("delete click");
    onDelete(rowId);
  };
  const handleInputChange = () => {
    console.log("input change");
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
            onInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
          />
        );
      })}
      <TableCellActions
        key={rowId.toString()}
        rowId={rowId}
        cellValue="actions"
        onEditClick={handleEditClick}
        onCancelClick={handleCancelClick}
        onSaveClick={handleSaveClick}
        onDeleteClick={handleDeleteClick}
        isEditable={isRowEditable}
      />
    </tr>
  );
}
