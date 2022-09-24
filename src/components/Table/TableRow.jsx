import React, {useState} from 'react';
import styles from './Table.module.scss';
import TableCell from './TableCell.jsx';
import TableCellActions from './TableCellActions.jsx';
import TableButtonsOnAdd from './TableButtonsOnAdd';

export default function TableRow({
                                     row,
                                     rowId,
                                     handleDelete,
                                     handleSaveChanges,
                                     isEditable,
                                     handleAddNewItem,
                                 }) {
    const [initialCellValues, setInitialCellValues] = useState(row);
    const [cellValues, setCellValues] = useState(row);
    const [isRowEditable, setIsRowEditable] = useState(isEditable);
    const [isCanceled, setIsCanceled] = useState(false);

    console.log('initialCellValues on start', initialCellValues);

    const handleEditClick = () => {
        setIsRowEditable(true);
        setIsCanceled(false);
    };
    const handleCancelClick = () => {
        setIsRowEditable(false);
        setIsCanceled(true);
        setCellValues({...initialCellValues});
    };
    const handleClearAddField = () => {
        console.log('handleClearAddField');
        setIsCanceled(true);
        setCellValues({...initialCellValues});
    };
    const handleSaveClick = () => {
        setIsRowEditable((prevState) => !prevState);
        handleSaveChanges(rowId, cellValues);
        setInitialCellValues(cellValues);
    };

    const handleInputBlur = (newValue) => {
        console.log('input blur');
        setCellValues((prevState) => {
            return {...prevState, ...newValue};
        });
    };

    const handleAddClick = () => {
        console.log('handleAddClick');
        // setIsCanceled(false);
        handleAddNewItem(cellValues);
        handleClearAddField();
    };

    const renderEditButtons = () => {
        return (<TableCellActions
            key={'row' + rowId.toString()}
            rowId={rowId}
            cellValue="actions"
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            handleDelete={handleDelete}
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
                console.log('initialValue', value);
                return (
                    <TableCell
                        cellPropName={key}
                        key={`${rowId}_${key}`}
                        initialValue={value}
                        rowId={rowId}
                        isRowEditable={isRowEditable}
                        isCanceled={isCanceled}
                        handleInputBlur={handleInputBlur}
                    />
                );
            })}
            {actionCell}
        </tr>
    );
}
