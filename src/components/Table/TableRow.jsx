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
    console.log("edit click");
    setIsRowEditable(true);
    setIsCanceled(false);
    console.log("isCanceled", isCanceled);
  };
  const handleCancelClick = () => {
    console.log("cancel click");
    setIsRowEditable(false);
    setIsCanceled(true);
    setCellValues({ ...initialCellValues });
  };
  const handleSaveClick = () => {
    console.log("save click");
    setIsRowEditable((prevState) => !prevState);
    handleSaveChanges(rowId, cellValues);
    setInitialCellValues(cellValues);
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
        handleEditClick={handleEditClick}
        handleCancelClick={handleCancelClick}
        handleSaveClick={handleSaveClick}
        handleDelete={handleDelete}
        isEditable={isRowEditable}
      />
    </tr>
  );
}
