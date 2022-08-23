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
  const [isRotated, setIsRotated] = React.useState(false);
  const handleRotateClick = () => {
    setIsRotated((prevState) => !prevState);
  };

  const handlePrevClick = (event) => {
    event.stopPropagation();
    onPrevClick();
  };
  const handleNextClick = (event) => {
    event.stopPropagation();
    onNextClick();
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
      <div className={cardClasses} onClick={handleRotateClick}>
        <button
          className={styles.prev}
          onClick={(event) => handlePrevClick(event)}
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
          onClick={(event) => handleNextClick(event)}
        ></button>
      </div>
      <div className={backClasses} onClick={handleRotateClick}>
        <div>
          {id + 1}/{cardsCount}
        </div>
        <div className={styles.card__text}>
          <div className={styles.value}>{value}</div>
        </div>
        <button className={styles.button_rotate}></button>
      </div>
    </div>
  );
}
export default Card;
