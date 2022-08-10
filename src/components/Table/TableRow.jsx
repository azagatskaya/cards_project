import React from "react";
import styles from "./Table.module.scss";
import TableCell from "./TableCell.jsx";
import TableCellActions from "./TableCellActions.jsx";

export default function TableRow({
  rowData,
  tableType,
  rowId,
  onDelete,
  cellPropNames,
}) {
  console.log(rowData);
  const [isRowEditable, setIsRowEditable] = React.useState(false);
  // const [visibleRowData, setVisibleRowData] = React.useState(rowData);
  const [isCanceled, setIsCanceled] = React.useState(false);
  // let cells = getCells(tableType);

  // function getCells(tableType) {
  //   if (tableType === "sets") {
  //     return [
  //       visibleRowData.rus_name,
  //       visibleRowData.data.length,
  //       visibleRowData.date,
  //     ];
  //   } else if (tableType === "words") {
  //     return [
  //       visibleRowData.word,
  //       visibleRowData.transcription,
  //       visibleRowData.value,
  //       visibleRowData.tags,
  //     ];
  //   }
  // }

  // React.useEffect(() => {
  //   cells = getCells(tableType);
  // }, [visibleRowData]);

  const handleEditClick = () => {
    console.log("edit click");
    setIsRowEditable(true);
    setIsCanceled(false);
  };
  const handleCancelClick = () => {
    console.log(rowData);
    console.log("cancel click");
    setIsRowEditable(false);
    setIsCanceled(true);
    // setVisibleRowData(rowData);
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
  const handleInputChange = (newValue, header) => {
    console.log("input change");
  };
  // const handleInputFocus = (oldValue) => {
  //   console.log("input focus");
  // };

  return (
    <tr className={styles.table__row}>
      {cellPropNames.map((cell) => {
        console.log("cell", cell);
        console.log("hasProp", rowData.hasOwnProperty(cell));
        console.log("rowData[cell]", rowData[cell]);
        if (cell === "numberOfCard") {
          return (
            <TableCell
              cellPropName={cell}
              key={cell.toString()}
              initialValue={rowData.data.length}
              cellValue={rowData.data.length}
              rowId={rowId}
              isEditable={isRowEditable}
              isCanceled={isCanceled}
              onInputChange={handleInputChange}
              // onInputFocus={handleInputFocus}
            />
          );
        } else if (rowData.hasOwnProperty(cell)) {
          return (
            <TableCell
              cellPropName={cell}
              key={cell.toString()}
              initialValue={rowData[cell]}
              cellValue={rowData[cell]}
              rowId={rowId}
              isEditable={isRowEditable}
              isCanceled={isCanceled}
              onInputChange={handleInputChange}
              // onInputFocus={handleInputFocus}
            />
          );
        }
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
