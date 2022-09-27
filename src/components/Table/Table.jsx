import React, {useState} from 'react';
import styles from './Table.module.scss';
import TableRow from './TableRow.jsx';

export default function Table({
                                  headers,
                                  rows,
                                  handleSaveChanges,
                                  handleDelete, handleAddNewItem,
                                  tableDataType
                              }) {
    const [isAddFieldVisible, setIsAddFieldVisible] = useState(false);
    const showAddField = () => {
        setIsAddFieldVisible((prevState) => !prevState);
    };
    const renderHeaderCell = (id, label) => {
        const cellClass = id === 'id' || id === 'numberOfCards' ?
            styles.table__header_cell_number :
            id === 'date' ?
                styles.table__header_cell_date :
                styles.table__header_cell;
        return (
            <td className={cellClass} key={id.toString()} id={id}>
                {label}
            </td>
        );
    };
    const renderHeader = () => {
        return (
            <thead>
            <tr className={styles.table__header_row}>
                {headers.map((header) => {
                    return renderHeaderCell(header.id, header.label);
                })}
                {renderHeaderButtonCell()}

            </tr>
            </thead>
        );
    };
    const renderHeaderButtonCell = () => {
        return (<td
            className={styles.table__header_cell_last}
            key={'actions'}
            id={'actions'}
        >
            <button
                className={styles.button + ' ' + styles.button_addRow + ' ' +
                    (isAddFieldVisible ?
                        styles.button_addRow_close :
                        styles.button_addRow_open)}
                onClick={showAddField}
            ></button>
        </td>);
    };
    const handleCancelAdd = () => {
    };
    const getTodayDate = () => {
        const date = new Date();
        const month = date.getMonth().length < 2 ?
            date.getMonth() :
            '0' + date.getMonth();
        return `${date.getFullYear()}-${month}-${date.getDate()}`;
    };
    const renderEmptyRow = () => {
        const emptyRow = {};
        headers.map((header) => {
            if (header.id === 'date') {
                emptyRow[header.id] = getTodayDate();
            } else if (header.id === 'numberOfCards') {
                emptyRow[header.id] = 0;
            } else {
                emptyRow[header.id] = '';
            }
        });
        return (<TableRow
            key={'add'}
            row={emptyRow}
            rowId={'add'}
            handleAddNewItem={handleAddNewItem}
            handleCancelAdd={handleCancelAdd}
            isEditable={true}
        />);
    };
    const emptyRow = isAddFieldVisible ? renderEmptyRow() : null;
    const tableClass = tableDataType === 'sets' ?
        (`${styles.table} ${styles.table__sets}`) :
        (`${styles.table} ${styles.table__words}`);
    return (
        <table className={tableClass}>
            {renderHeader()}
            <tbody>
            {emptyRow}
            {rows.map((row) => (
                <TableRow
                    row={row}
                    key={row.id.toString()}
                    rowId={row.id}
                    handleDelete={handleDelete}
                    handleSaveChanges={handleSaveChanges}
                />
            ))}
            </tbody>
        </table>
    );
}
