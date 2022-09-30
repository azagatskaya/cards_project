// import React, {useParams, useState} from 'react';
// import {useParams} from 'react-router-dom';
import Card from '../components/Card/Card.jsx';
import Table from '../components/Table/Table.jsx';
import {useContext} from "react";
import {WordsContext} from "../context/wordsContext";

const StudyPage = () => {
    const {
        rows,
        cellPropNames,
        tableDataType,
        activeWordId,
        changeData,
        addData, handleNextClick, handlePrevClick
    } = useContext(WordsContext);
    // const {id} = useParams();
    // const [activeSetId, setActiveSetId] = useState(null);
    //
    // useEffect(() => {
    //     updateActiveSetId();
    // }, [id])
    //
    // const updateActiveSetId = () => {
    //     clearError();
    //     getRows(id) //getWords
    //         .then(onRowsLoaded);
    // }
    //
    // const onRowsLoaded = () => {
    //
    // }

    const card = (rows.length === 0) ? null : <Card
        {...rows[activeWordId]}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        key={rows[activeWordId].id}
        id={activeWordId}
        cardsCount={rows.length}
    />;
    return (
        <>
            {card}
            <Table
                key={'words'}
                headers={cellPropNames}
                rows={rows}
                handleSaveChanges={changeData}
                handleDelete={changeData}
                handleAddNewItem={addData}
                tableDataType={tableDataType}
            />
        </>
    );
};

export default StudyPage;
