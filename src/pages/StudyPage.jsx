import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import Card from '../components/Card/Card.jsx';
import Table from '../components/Table/Table.jsx';
import {WordsContext} from "../context/wordsContext";

const StudyPage = () => {
    const {rows, handleSetSelect} = useContext(WordsContext);
    const {id} = useParams();

    useEffect(() => {
        handleSetSelect(id);
    }, [id])

    const card = rows.length !== 0 ? <Card/> : null;

    return (
        <>
            {card}
            <Table
                key={'words'}
            />
        </>
    );
};

export default StudyPage;
