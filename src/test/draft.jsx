//   const TableRow = ({ rowData, tableDataType }) => {
//     let cells;
//     if (tableDataType === "sets") {
//       cells = [rowData.rus_name, rowData.data.length, rowData.date];
//     } else if (tableDataType === "words") {
//       cells = [
//         rowData.word,
//         rowData.transcription,
//         rowData.value,
//         rowData.tags,
//       ];
//     }
//     return (
//       <tr className={styles.table__row}>
//         {cells.map((cell, index) => (
//           <TableCell value={cell} id={index} />
//         ))}
//         <TableCell value="actions"></TableCell>
//       </tr>
//     );
//   };

//   const TableCell = ({ value, id }) => {
//     return (
//       <td className={styles.table__cell}>
//         {value !== "actions" ? (
//           value
//         ) : (
//           <>
//             <button
//               className={styles.button + " " + styles.button_save}
//             ></button>
//             <button
//               className={styles.button + " " + styles.button_edit}
//               onClick={() => handleEditClick(id)}
//             ></button>
//             <button
//               className={styles.button + " " + styles.button_delete}
//             ></button>
//           </>
//         )}
//       </td>
//     );
//   };
