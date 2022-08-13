import React from "react";
import styles from "./Home.module.scss";
import CardSetButton from "../components/CardSetButton/CardSetButton.jsx";
import Card from "../components/Card/Card.jsx";
import Table from "../components/Table/Table.jsx";

let url = "";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [activeSetId, setActiveSetId] = React.useState(null);
  const [activeWordId, setActiveWordId] = React.useState(0);

  const handleNextClick = (id) => {
    if (id > items[0].data.length - 1) {
      id = 0;
    }
    setActiveWordId(id);
  };
  const handlePrevClick = (id) => {
    if (id < 0) {
      id = items[0].data.length - 1;
    }
    setActiveWordId(id);
  };
  React.useEffect(() => {
    url =
      activeSetId === null
        ? "https://62d2e89181cb1ecafa67c833.mockapi.io/setsOfWords/setsOfWords"
        : "https://62d2e89181cb1ecafa67c833.mockapi.io/setsOfWords/setsOfWords?id=" +
          activeSetId;
    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, [activeSetId]);
  const onSaveChanges = (e) => {
    console.log("onSaveChanges");
    console.log(e);
    const childCount = e.currentTarget.parentNode.parentNode.childElementCount;
    console.log(childCount);
    for (let i = 0; i < childCount - 1; i++) {
      console.log(
        e.target.parentNode.parentNode.childNodes[i].firstChild.value
      );
    }
  };
  return (
    <>
      {activeSetId === null ? (
        <div className={styles.wrapper}>
          <div className={styles.buttons}>
            {items.map((el) => (
              <CardSetButton
                {...el}
                key={el.id.toString()}
                handleSetSelect={setActiveSetId}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Card
            {...items[0].data[activeWordId]}
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            key={items[0].data[activeWordId].id}
            id={activeWordId}
            cardsCount={items[0].data.length}
          />
          <div className={styles.card_buttons__wrapper}></div>
        </>
      )}

      {activeSetId === null ? (
        <Table tableDataType="sets" key={"sets"} tableData={items} />
      ) : (
        <Table
          tableDataType="words"
          key={"words"}
          tableData={items[0].data}
          onSaveChanges={onSaveChanges}
        />
      )}
    </>
  );
};
export default Home;
