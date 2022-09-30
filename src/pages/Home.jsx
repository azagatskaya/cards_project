import React, {useContext} from 'react';
import styles from './Home.module.scss';
import CardSetButton from '../components/CardSetButton/CardSetButton.jsx';
import Table from '../components/Table/Table.jsx';
import {WordsContext} from "../context/wordsContext";


const Home = () => {
    const {rows, cellPropNames, tableDataType, handleSetSelect, changeData, addData} = useContext(WordsContext);
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
export default Home;
