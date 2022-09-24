import React from 'react';
// import {useParams} from 'react-router-dom';
import styles from './Home.module.scss';
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
  console.log('rows', rows.length);
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
      <div className={styles.card_buttons__wrapper}></div>
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
