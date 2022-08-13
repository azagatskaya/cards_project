import React from "react";
import styles from "./Table.module.scss";
import TableRow from "./TableRow.jsx";

function getHeaders(tableDataType) {
  let headCells = [];
  if (tableDataType === "sets") {
    headCells = [
      {
        id: "id",
        label: "ID",
      },
      {
        id: "rus_name",
        label: "Название",
      },
      {
        id: "numberOfCards",
        label: "Количество",
      },
      {
        id: "date",
        label: "Дата",
      },
    ];
  } else if (tableDataType === "words") {
    headCells = [
      {
        id: "id",
        label: "ID",
      },
      {
        id: "word",
        label: "Слово",
      },
      {
        id: "transcription",
        label: "[...]",
      },
      {
        id: "value",
        label: "Значение",
      },
      {
        id: "tags",
        label: "Теги",
      },
    ];
  } else {
    throw new Error("unknown table data type");
  }
  return headCells;
}

function getRows(tableDataType) {
  let cellPropNames;
  if (tableDataType === "sets") {
    cellPropNames = ["id", "rus_name", "numberOfCards", "date"];
  } else if (tableDataType === "words") {
    cellPropNames = ["id", "word", "transcription", "value", "tags"];
  } else {
    throw new Error("unknown table data type");
  }
  return cellPropNames;
}

export default function Table({ tableDataType, tableData, onSaveChanges }) {
  const cellPropNames = getRows(tableDataType);
  const handleRowDelete = (rowId) => {};
  const headers = getHeaders(tableDataType);
  const TableHeader = () => {
    return (
      <thead>
        <tr className={styles.table__headerRow}>
          {headers.map((header) => (
            <TableHeaderCell
              key={header.id.toString()}
              id={header.id}
              label={header.label}
            />
          ))}
          <TableHeaderCell key={"actions"} id="actions" />
        </tr>
      </thead>
    );
  };

  const TableHeaderCell = ({ id, label }) => {
    return (
      <td className={styles.table__headerCell} id={id}>
        {label}
      </td>
    );
  };

  return (
    <table className={styles.table}>
      <TableHeader key={"header"} />
      <tbody>
        {tableData.map((row) => (
          <TableRow
            cellPropNames={cellPropNames}
            rowData={row}
            // tableType={tableDataType}
            key={row.id.toString()}
            rowId={row.id}
            onDelete={handleRowDelete}
            onSaveChanges={onSaveChanges}
          />
        ))}
      </tbody>
    </table>
  );
}
