import React, {useContext} from 'react';
import styles from './Card.module.scss';
import {WordsContext} from "../../context/wordsContext";

function Card() {
    const {rows, activeWordId, handleNextClick, handlePrevClick, cardsCount} = useContext(WordsContext);
    const {word, transcription, value} = rows[activeWordId];
    const [isRotated, setIsRotated] = React.useState(false);
    const handleRotateClick = () => {
        setIsRotated((prevState) => !prevState);
    };

    const handlePrev = (event) => {
        event.stopPropagation();
        handlePrevClick();
    };
    const handleNext = (event) => {
        event.stopPropagation();
        handleNextClick();
    };

    let cardClasses;
    let backClasses;

    if (isRotated) {
        cardClasses = `${styles.card} ${styles.rotated}`;
        backClasses = `${styles.card__back}  ${styles.back__rotated}`;
    } else {
        cardClasses = styles.card;
        backClasses = `${styles.card__back}`;
    }
    return (
        <div className={styles.card__wrapper}>
            <div className={cardClasses} onClick={handleRotateClick}>
                <button
                    className={styles.prev}
                    onClick={(event) => handlePrev(event)}
                ></button>
                <div>{activeWordId + 1}/{cardsCount}</div>
                <div className={styles.card__text}>
                    <div className={styles.word}>{word}</div>
                    <div className={styles.transcription}>{transcription}</div>
                </div>
                <button className={styles.button_rotate}></button>
                <button
                    className={styles.next}
                    onClick={(event) => handleNext(event)}
                ></button>
            </div>
            <div className={backClasses} onClick={handleRotateClick}>
                <div>{activeWordId + 1}/{cardsCount}</div>
                <div className={styles.card__text}>
                    <div className={styles.value}>{value}</div>
                </div>
                <button className={styles.button_rotate}></button>
            </div>
        </div>
    );
}

export default Card;
