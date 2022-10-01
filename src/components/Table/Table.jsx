import React, {useState, useContext} from 'react';
import styles from './Table.module.scss';
import TableRow from './TableRow.jsx';
import {WordsContext} from "../../context/wordsContext";

export default function Table() {
    const {
        rows,
        cellPropNames,
        tableDataType,
        addData
    } = useContext(WordsContext);

    const [isAddFieldVisible, setIsAddFieldVisible] = useState(false);

    const showAddField = () => {
        setIsAddFieldVisible((prevState) => !prevState);
    };

    const renderHeaderCell = (id, label) => {
        const cellClass = id === 'id' ?
            (styles.table__header_cell_number + ' ' + styles.table__header_cell_id) :
            id === 'numberOfCards' ?
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
                {cellPropNames.map((header) => {
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

    const getTodayDate = () => {
        const date = new Date();
        let month = formatMonthAndDate(Number(date.getMonth()) + 1);
        return `${date.getFullYear()}-${month}-${formatMonthAndDate(date.getDate())}`;
    };

    const formatMonthAndDate = (val) => {
        return String(val).length < 2 ?
            ('0' + String(val)) : val;
    };

    const renderEmptyRow = () => {
        const emptyRow = {};
        cellPropNames.map((header) => {
            if (header.id === 'date') emptyRow[header.id] = getTodayDate();
            else if (header.id === 'numberOfCards') emptyRow[header.id] = 0;
            else emptyRow[header.id] = '';
        });
        return (<TableRow
            key={'add'}
            row={emptyRow}
            rowId={'add'}
            addData={addData}
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
                    key={row.id.toString()}
                    row={row}
                    rowId={row.id}
                />
            ))}
            </tbody>
        </table>
    );
}
