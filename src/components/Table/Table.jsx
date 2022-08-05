import React from "react";
import styles from "./Table.module.scss";
import TableRow from "./TableRow.jsx";

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
  let cellNames;
  if (tableDataType === "sets") {
    cellNames = ["id", "rus_name", "date", "numberOfCards", "data"];
    // rows = data.map((set) => {
    //   const container = {};
    //   container.id = set.id;
    //   container.rus_name = set.rus_name;
    //   container.date = set.date;
    //   container.numberOfCards = set.data.length;
    //   container.data = set.data;
    //   return container;
    // });
  } else if (tableDataType === "words") {
    cellNames = ["id", "word", "transcription", "value", "tags"];
    // rows = data.map((set) => {
    //   const container = {};
    //   container.id = set.id;
    //   container.word = set.word;
    //   container.transcription = set.transcription;
    //   container.value = set.value;
    //   container.tags = set.tags;
    //   return container;
    // });
  } else {
    throw new Error("unknown table data type");
  }
  return cellNames;
}

export default function Table({ tableDataType, tableData }) {
  console.log("tableData", tableData);
  const [data, setData] = React.useState(tableData);

  const cellNames = getRows(tableDataType);
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
        {data.map((row) => (
          <TableRow
            headers={headers}
            rowData={row}
            tableType={tableDataType}
            key={row.id.toString()}
            rowId={row.id}
            onDelete={handleRowDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
