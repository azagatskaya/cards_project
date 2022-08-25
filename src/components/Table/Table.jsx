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
  const renderHeaderCell = (id, label) => {
    return (
      <td className={styles.table__headerCell} key={id.toString()} id={id}>
        {label}
      </td>
    );
  };
  const renderHeader = () => {
    return (
      <thead>
        <tr className={styles.table__headerRow}>
          {headers.map((header) => {
            return renderHeaderCell(header.id, header.label);
          })}
          <td
            className={styles.table__headerCell}
            key={"actions"}
            id={"actions"}
          >
            <button
              className={styles.button + " " + styles.button_add}
            ></button>
          </td>
        </tr>
      </thead>
    );
  };

  return (
    <table className={styles.table}>
      {renderHeader()}
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
