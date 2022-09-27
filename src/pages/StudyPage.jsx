// import React, {useState, useEffect} from 'react';
// import {useParams} from 'react-router-dom';
import Card from '../components/Card/Card.jsx';
import Table from '../components/Table/Table.jsx';

const StudyPage = ({
                       headers,
                       rows,
                       activeWordId,
                       handleNextClick,
                       handlePrevClick,
                       handleSaveChanges,
                       handleDelete, handleAddNewItem,

                   }) => {
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
                headers={headers}
                rows={rows}
                handleSaveChanges={handleSaveChanges}
                handleDelete={handleDelete}
                handleAddNewItem={handleAddNewItem}
            />
        </>
    );
};

export default StudyPage;
