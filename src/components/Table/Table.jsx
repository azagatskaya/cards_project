import React from "react";
import styles from "./Table.module.scss";
import TableRow from "../TableRow/TableRow.jsx";

function getHeaders(tableDataType) {
  let headCells = [];
  if (tableDataType === "sets") {
    headCells = [
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
        id: "word",
        label: "Слово",
      },
      {
        id: "transcription",
        label: "Транскрипция",
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

function getRows(tableDataType, data) {
  let rows;
  if (tableDataType === "sets") {
    rows = data.map((set) => {
      const container = {};
      container.rus_name = set.rus_name;
      container.date = set.date;
      container.numberOfCards = set.data.length;
      container.data = set.data;
      return container;
    });
  } else if (tableDataType === "words") {
    rows = data.map((set) => {
      const container = {};
      container.word = set.word;
      container.transcription = set.transcription;
      container.value = set.value;
      container.tags = set.tags;
      return container;
    });
  } else {
    throw new Error("unknown table data type");
  }
  return rows;
}

export default function Table({ tableDataType, data }) {
  const rows = getRows(tableDataType, data);

  const TableHeader = ({ dataType }) => {
    return (
      <tr className={styles.table__headerRow}>
        {getHeaders(dataType).map((header) => (
          <TableHeaderCell id={header.id} label={header.label} />
        ))}
        <TableHeaderCell id="actions" />
      </tr>
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
      <TableHeader dataType={tableDataType} />
      {rows.map((row) => (
        <TableRow rowData={row} tableType={tableDataType} />
      ))}
    </table>
  );
}
