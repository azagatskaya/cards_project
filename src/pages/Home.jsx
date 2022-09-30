import React, {useEffect, useState, useContext} from 'react';
import styles from './Home.module.scss';
import CardSetButton from '../components/CardSetButton/CardSetButton.jsx';
import Table from '../components/Table/Table.jsx';
import {WordsContext} from "../context/wordsContext";
import {useParams} from "react-router-dom";


const Home = () => {
    const {rows, cellPropNames, tableDataType, handleSetSelect, changeData, addData} = useContext(WordsContext);
    const [visibleRows, setVisibleRows] = useState(rows)

    useEffect(() => {
        handleSetSelect(null);
    }, [])
    useEffect(() => {
        setVisibleRows(rows);
    }, [rows])

    return (
        <>
            <div className={styles.buttons_block}>
                {visibleRows.map((el) => (
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
                rows={visibleRows}
                handleSaveChanges={changeData}
                handleDelete={changeData}
                handleAddNewItem={addData}
                tableDataType={tableDataType}
            />
        </>
    );
};
export default Home;
