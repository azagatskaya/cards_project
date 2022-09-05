import styles from "./Home.module.scss";
import CardSetButton from "../components/CardSetButton/CardSetButton.jsx";
import Table from "../components/Table/Table.jsx";

const Home = ({
  headers,
  cellPropNames,
  rows,
  handleDelete,
  handleSetSelect,
  handleSaveChanges,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.buttons}>
          {rows.map((el) => (
            <CardSetButton
              {...el}
              key={el.id.toString()}
              handleSetSelect={handleSetSelect}
            />
          ))}
        </div>
      </div>
      <Table
        key={"sets"}
        headers={headers}
        cellPropNames={cellPropNames}
        rows={rows}
        handleSaveChanges={handleSaveChanges}
        handleDelete={handleDelete}
      />
    </>
  );
};
export default Home;
