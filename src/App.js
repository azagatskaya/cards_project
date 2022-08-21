import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import NotFound from "./pages/NotFound.jsx";

let url = "";

function App() {
  const [rows, setRows] = useState([]);
  const [activeSetId, setActiveSetId] = useState(null);
  const [activeWordId, setActiveWordId] = useState(0);
  const [tableDataType, setTableDataType] = useState("sets");
  const [headers, setHeaders] = useState([]);
  const [cellPropNames, setCellPropNames] = useState([]);

  const handleNextClick = (id) => {
    if (id > rows.length - 1) {
      id = 0;
    }
    setActiveWordId(id);
  };
  const handlePrevClick = (id) => {
    if (id < 0) {
      id = rows.length - 1;
    }
    setActiveWordId(id);
  };
  useEffect(() => {
    console.log("useEffect activeSetId");
    url =
      activeSetId === null
        ? "https://62d2e89181cb1ecafa67c833.mockapi.io/setsOfWords/setsOfWords"
        : "https://62d2e89181cb1ecafa67c833.mockapi.io/setsOfWords/setsOfWords?id=" +
          activeSetId;
    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        const propNames = getCellPropNames(
          activeSetId === null ? "sets" : "words"
        );
        let res = [];
        let data = activeSetId === null ? arr : arr[0].data;
        data.map((elem) => {
          let newRow = {};
          propNames.map((cell) => {
            if (elem.hasOwnProperty(cell) || cell === "numberOfCards") {
              const initialValue =
                cell === "numberOfCards" ? elem.data.length : elem[cell];
              newRow = { ...newRow, [cell]: initialValue };
            }
          });
          res = [...res, newRow];
        });
        setRows(res);
      });
  }, [activeSetId]);
  // const makeCounter = () => {
  //   let count = 0;

  //   return function () {
  //     return count++;
  //   };
  // };
  // let counter = makeCounter();

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
  function getHeaders(tableDataType) {
    let headCells = [];
    if (tableDataType === "sets") {
      headCells = [
        {
          id: "id",
          label: "ID",
        },
        {
          id: "rus_name",
          label: "Название",
        },
        {
          id: "numberOfCards",
          label: "Количество",
        },
        {
          id: "date",
          label: "Дата",
        },
      ];
    } else if (tableDataType === "words") {
      headCells = [
        {
          id: "id",
          label: "ID",
        },
        {
          id: "word",
          label: "Слово",
        },
        {
          id: "transcription",
          label: "[...]",
        },
        {
          id: "value",
          label: "Значение",
        },
        {
          id: "tags",
          label: "Теги",
        },
      ];
    } else {
      throw new Error("unknown table data type");
    }
    return headCells;
  }

  function getCellPropNames(tableDataType) {
    console.log(tableDataType);
    if (tableDataType === "sets") {
      return ["id", "rus_name", "numberOfCards", "date"];
    } else if (tableDataType === "words") {
      return ["id", "word", "transcription", "value", "tags"];
    } else {
      throw new Error("unknown table data type");
    }
  }
  const handleSetSelect = (id) => {
    console.log("handleSetSelect");
    setActiveSetId(id);
    setTableDataType("words");
  };

  useEffect(() => {
    console.log("useEffect tableDataType");
    setHeaders(() => getHeaders(tableDataType));
    setCellPropNames(() => getCellPropNames(tableDataType));
  }, [tableDataType]);

  const onReturnToHomePage = () => {
    setActiveSetId(null);
    setTableDataType("sets");
    setActiveWordId(0);
  };
  return (
    <div className={styles.App}>
      <Header onReturnToHomePage={onReturnToHomePage} />
      <main className={styles.main}>
        <div className={styles.main__wrapper}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  // items={items}
                  headers={headers}
                  cellPropNames={cellPropNames}
                  rows={rows}
                  onSaveChanges={onSaveChanges}
                  handleSetSelect={handleSetSelect}
                />
              }
            />
            <Route
              exact
              path="/study"
              element={
                <StudyPage
                  // items={items}
                  headers={headers}
                  cellPropNames={cellPropNames}
                  rows={rows}
                  onSaveChanges={onSaveChanges}
                  activeWordId={activeWordId}
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
