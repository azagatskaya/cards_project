import React, {useEffect, useContext} from 'react';
import styles from './Home.module.scss';
import CardSetButton from '../components/CardSetButton/CardSetButton.jsx';
import Table from '../components/Table/Table.jsx';
import {WordsContext} from "../context/wordsContext";

const Home = () => {
    const {rows, handleSetSelect} = useContext(WordsContext);

    useEffect(() => {
        handleSetSelect(null);
    }, [])

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
            />
        </>
    );
};
export default Home;
