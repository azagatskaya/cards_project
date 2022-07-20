import React from "react";
import styles from "../Table/Table.module.scss";
import TableCell from "../TableCell/TableCell.jsx";

export default function TableRow({ rowData, tableType }) {
  const [isRowEditable, setIsRowEditable] = React.useState(false);

  const handleEditClick = () => {
    setIsRowEditable((prevState) => !prevState);
  };

  let cells;
  if (tableType === "sets") {
    cells = [rowData.rus_name, rowData.data.length, rowData.date];
  } else if (tableType === "words") {
    cells = [rowData.word, rowData.transcription, rowData.value, rowData.tags];
  }
  return (
    <tr className={styles.table__row}>
      {cells.map((cell, index) => (
        <TableCell
          value={cell}
          rowId={index}
          onEditClick={handleEditClick}
          isEditable={isRowEditable}
        />
      ))}
      <TableCell value="actions"></TableCell>
    </tr>
  );
}
