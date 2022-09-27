import React from 'react';
import styles from './Home.module.scss';
import CardSetButton from '../components/CardSetButton/CardSetButton.jsx';
import Table from '../components/Table/Table.jsx';

const Home = ({
                  headers,
                  rows,
                  handleDelete,
                  handleSetSelect,
                  handleSaveChanges, handleAddNewItem,
                  tableDataType
              }) => {
    return (
        <>
            <div className={styles.buttons_block}>
                {rows.map((el) => (
                    <CardSetButton
                        {...el}
                        key={el.id.toString()}
                        handleSetSelect={handleSetSelect}
                    />
                ))}
            </div>
            <Table
                key={'sets'}
                headers={headers}
                rows={rows}
                handleSaveChanges={handleSaveChanges}
                handleDelete={handleDelete}
                handleAddNewItem={handleAddNewItem}
                tableDataType={tableDataType}
            />
        </>
    );
};
export default Home;
