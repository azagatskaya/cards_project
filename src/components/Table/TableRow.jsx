import React from "react";
import styles from "./Table.module.scss";
import TableCell from "./TableCell.jsx";
import TableCellActions from "./TableCellActions.jsx";

export default function TableRow({ rowData, tableType, rowId, onDelete }) {
  const [isRowEditable, setIsRowEditable] = React.useState(false);

  const handleEditClick = (id) => {
    console.log("edit click");
    setIsRowEditable((prevState) => !prevState);
  };
  const handleSaveClick = (id) => {
    console.log("save click");
    setIsRowEditable((prevState) => !prevState);
    // if (isCellValueChanged) {
    // setNewValue;
    // }
  };
  const handleDeleteClick = (rowId) => {
    console.log("delete click");
    onDelete(rowId);
  };
  const handleInputChange = (newValue) => {
    console.log("input change");
  };
  const handleInputFocus = (oldValue) => {
    console.log("input focus");
  };

  let cells;
  if (tableType === "sets") {
    cells = [rowData.rus_name, rowData.data.length, rowData.date];
  } else if (tableType === "words") {
    cells = [rowData.word, rowData.transcription, rowData.value, rowData.tags];
  }
  return (
    <tr className={styles.table__row}>
      {cells.map((cell) => (
        <TableCell
          cellValue={cell}
          key={cell.toString()}
          isEditable={isRowEditable}
          onInputChange={handleInputChange}
          onInputFocus={handleInputFocus}
        />
      ))}
      <TableCellActions
        key={rowId.toString()}
        cellValue="actions"
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
        onDeleteClick={handleDeleteClick}
        rowId={rowId}
        isEditable={isRowEditable}
      />
    </tr>
  );
}
