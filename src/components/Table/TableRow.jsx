import React, {useState, useEffect, useContext} from 'react';
import styles from './Table.module.scss';
import TableCell from './TableCell.jsx';
import TableCellActions from './TableCellActions.jsx';
import TableButtonsOnAdd from './TableButtonsOnAdd';
import {WordsContext} from "../../context/wordsContext";

export default function TableRow({row, rowId, isEditable}) {
    const {validateRow, changeData, addData} = useContext(WordsContext);
    const [initialCellValues, setInitialCellValues] = useState(row);
    const [cellValues, setCellValues] = useState(row);
    const [isRowEditable, setIsRowEditable] = useState(isEditable);
    const [isCanceled, setIsCanceled] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setCellValues(initialCellValues);
    }, [initialCellValues])

    const handleEditClick = () => {
        setIsRowEditable(true);
        setIsCanceled(false);
    };
    const handleCancelClick = () => {
        setIsRowEditable(false);
        setIsCanceled(true);
        setIsValid(true);
        setCellValues({...initialCellValues});
    };
    const handleClearAddField = () => {
        setIsCanceled(true);
        setCellValues({...initialCellValues});
        setIsValid(true);
    };
    const handleSaveClick = () => {
        const validCellValues = validateRow(cellValues);
        if (validCellValues !== false && typeof validCellValues === 'object') {
            setIsRowEditable((prevState) => !prevState);
            changeData(rowId, cellValues);
            setInitialCellValues(validCellValues);
            setIsValid(true);
        }
    };

    const handleInputBlur = (newValue) => {
        setCellValues((prevState) => {
            return {...prevState, ...newValue};
        });
    };

    const handleAddClick = () => {
        const validCellValues = validateRow(cellValues);
        setIsCanceled(false);
        if (validCellValues !== false && typeof validCellValues === 'object') {
            addData(validCellValues);
            handleClearAddField();
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const renderEditButtons = () => {
        return (<TableCellActions
            key={'row' + rowId.toString()}
            rowId={rowId}
            cellValue="actions"
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            isEditable={isRowEditable}
        />);
    };

    const renderAddButtons = () => {
        return (<TableButtonsOnAdd
            key={'add'}
            handleAddNewItem={handleAddClick}
            handleClearAddField={handleClearAddField}
        />);
    };

    const actionCell = rowId === 'add' ? renderAddButtons() : renderEditButtons();
    return (
        <tr className={styles.table__row}>
            {Object.entries(cellValues).map(([key, value]) => {
                return (
                    <TableCell
                        cellPropName={key}
                        key={`${rowId}_${key}`}
                        initialValue={value}
                        rowId={rowId}
                        isRowEditable={isRowEditable}
                        isCanceled={isCanceled}
                        isValid={isValid}
                        handleInputBlur={handleInputBlur}
                    />
                );
            })}
            {actionCell}
        </tr>
    );
}
