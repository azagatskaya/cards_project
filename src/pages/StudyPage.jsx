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
  console.log(rows);
  return (
    <>
      <Card
        {...rows[0].data[activeWordId]}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        key={rows[0].data[activeWordId].id}
        id={activeWordId}
        cardsCount={rows[0].data.length}
      />
      <div className={styles.card_buttons__wrapper}></div>
      <Table
        key={"words"}
        headers={headers}
        cellPropNames={cellPropNames}
        rows={rows[0].data}
        onSaveChanges={onSaveChanges}
      />
    </>
  );
};

export default StudyPage;
