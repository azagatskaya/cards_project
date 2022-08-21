import React from "react";
import styles from "./Table.module.scss";
import TableCell from "./TableCell.jsx";
import TableCellActions from "./TableCellActions.jsx";

export default function TableRow({
  // rows,
  rowData,
  // tableType,
  rowId,
  onDelete,
  onSaveChanges,
  cellPropNames,
}) {
  const [isRowEditable, setIsRowEditable] = React.useState(false);
  const [isCanceled, setIsCanceled] = React.useState(false);
  const makeCounter = () => {
    let count = 0;

    return function () {
      return count++;
    };
  };
  let counter = makeCounter();

  const getCellValues = () => {
    let res = {};
    cellPropNames.map((cell) => {
      if (rowData.hasOwnProperty(cell) || cell === "numberOfCards") {
        const initialValue =
          cell === "numberOfCards" ? rowData.data.length : rowData[cell];
        res = { ...res, [counter()]: initialValue };
      }
    });
    return res;
  };

  const [cellValues, setCellValues] = React.useState(() => getCellValues());

  // console.log(cellValues);
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
  const handleSaveClick = (e) => {
    console.log("save click");
    setIsRowEditable((prevState) => !prevState);
    onSaveChanges(cellValues);
  };
  const handleDeleteClick = (rowId) => {
    console.log("delete click");
    onDelete(rowId);
  };
  const handleInputChange = (newValue, header) => {
    console.log("input change");
  };
  const handleInputBlur = (newValue) => {
    console.log("input blur");
    console.log(newValue);
  };

  return (
    <tr className={styles.table__row}>
      {Object.entries(cellValues).map(([key, value]) => {
        return (
          <TableCell
            cellPropName={cellPropNames[key]}
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
