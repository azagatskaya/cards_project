import React from "react";
import styles from "./Table.module.scss";
import TableRow from "./TableRow.jsx";

export default function Table({
  headers,
  cellPropNames,
  rows,
  handleSaveChanges,
  handleDelete,
}) {
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
        {rows.map((row) => (
          <TableRow
            row={row}
            key={row.id.toString()}
            rowId={row.id}
            handleDelete={handleDelete}
            handleSaveChanges={handleSaveChanges}
            cellPropNames={cellPropNames}
          />
        ))}
      </tbody>
    </table>
  );
}
