import styles from "./Home.module.scss";
import Card from "../components/Card/Card.jsx";
import Table from "../components/Table/Table.jsx";

const StudyPage = ({
  headers,
  cellPropNames,
  rows,
  activeWordId,
  handleNextClick,
  handlePrevClick,
  onSaveChanges,
}) => {
  return (
    <>
      <Card
        {...rows[activeWordId]}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        key={rows[activeWordId].id}
        id={activeWordId}
        cardsCount={rows.length}
      />
      <div className={styles.card_buttons__wrapper}></div>
      <Table
        key={"words"}
        headers={headers}
        cellPropNames={cellPropNames}
        rows={rows}
        onSaveChanges={onSaveChanges}
      />
    </>
  );
};

export default StudyPage;
