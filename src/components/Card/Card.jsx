import React from "react";
import styles from "./Card.module.scss";

function Card({
  word,
  transcription,
  value,
  onPrevClick,
  onNextClick,
  id,
  cardsCount,
}) {
  console.log(word, transcription, value);
  const [isRotated, setIsRotated] = React.useState(false);
  const handleRotateClick = () => {
    setIsRotated((prevState) => !prevState);
  };

  const handlePrevClick = (event, id) => {
    event.stopPropagation();
    onPrevClick(id);
  };
  const handleNextClick = (event, id) => {
    event.stopPropagation();
    onNextClick(id);
  };

  let cardClasses, backClasses;

  if (isRotated) {
    cardClasses = `${styles.card} ${styles.rotated}`;
    backClasses = `${styles.card__back}  ${styles.back__rotated}`;
  } else {
    cardClasses = styles.card;
    backClasses = `${styles.card__back}`;
  }
  return (
    <div className={styles.card__wrapper}>
      <button className={cardClasses} onClick={handleRotateClick}>
        <button
          className={styles.prev}
          onClick={(event) => handlePrevClick(event, id - 1)}
        ></button>
        <div>
          {id + 1}/{cardsCount}
        </div>
        <div className={styles.card__text}>
          <div className={styles.word}>{word}</div>
          <div className={styles.transcription}>{transcription}</div>
        </div>
        <button className={styles.button_rotate}></button>
        <button
          className={styles.next}
          onClick={(event) => handleNextClick(event, id + 1)}
        ></button>
      </button>
      <button className={backClasses} onClick={handleRotateClick}>
        <div className={styles.card__text}>
          <div className={styles.value}>{value}</div>
        </div>
        <button className={styles.button_rotate}></button>
      </button>
    </div>
  );
}
export default Card;
