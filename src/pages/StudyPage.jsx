import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import Card from '../components/Card/Card.jsx';
import Table from '../components/Table/Table.jsx';
import {WordsContext} from "../context/wordsContext";

const StudyPage = () => {
    const {
        rows,
        cellPropNames,
        tableDataType,
        activeWordId,
        changeData,
        addData, handleNextClick, handlePrevClick, handleSetSelect
    } = useContext(WordsContext);
    const {id} = useParams();
    const [visibleRows, setVisibleRows] = useState(rows)

    useEffect(() => {
        handleSetSelect(id);
    }, [id])
    useEffect(() => {
        setVisibleRows(rows);
    }, [rows])

    const card = (visibleRows.length === 0) ? null : <Card
        {...visibleRows[activeWordId]}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        key={visibleRows[activeWordId].id}
        id={activeWordId}
        cardsCount={visibleRows.length}
    />;
    return (
        <>
            {card}
            <Table
                key={'words'}
                headers={cellPropNames}
                rows={visibleRows}
                handleSaveChanges={changeData}
                handleDelete={changeData}
                handleAddNewItem={addData}
                tableDataType={tableDataType}
            />
        </>
    );
};

export default StudyPage;
