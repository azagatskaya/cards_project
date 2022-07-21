import React from "react";
import styles from "./Table.module.scss";
import TableCell from "./TableCell.jsx";

export default function TableRow({ rowData, tableType, rowId }) {
  const [isRowEditable, setIsRowEditable] = React.useState(false);

  const handleEditClick = () => {
    console.log("edit click");
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
      {cells.map((cell) => (
        <TableCell cellValue={cell} id={rowId} isEditable={isRowEditable} />
      ))}
      <TableCell
        cellValue="actions"
        onEditClick={handleEditClick}
        id={rowId}
        isEditable={isRowEditable}
      />
    </tr>
  );
}
