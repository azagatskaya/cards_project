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
  const [items, setItems] = useState([]);
  const [activeSetId, setActiveSetId] = useState(null);
  const [activeWordId, setActiveWordId] = useState(0);
  const [tableDataType, setTableDataType] = useState("sets");
  const [headers, setHeaders] = useState([]);
  // const [rows, setRows] = useState([]);
  const [cellPropNames, setCellPropNames] = useState([]);

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
  useEffect(() => {
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
  const getHeaders = (tableDataType) => {
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
  };

  const getRows = (tableDataType) => {
    if (tableDataType === "sets") {
      return ["id", "rus_name", "numberOfCards", "date"];
    } else if (tableDataType === "words") {
      return ["id", "word", "transcription", "value", "tags"];
    } else {
      throw new Error("unknown table data type");
    }
  };
  const handleSetSelect = (id) => {
    setActiveSetId(id);
    setTableDataType("words");
  };
  useEffect(() => {
    setHeaders(getHeaders(tableDataType));
    setCellPropNames(getRows(tableDataType));
  }, [tableDataType]);
  console.log("cellPropNames", cellPropNames);
  console.log("tableDataType", tableDataType);

  return (
    <div className={styles.App}>
      <Header />
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
                  rows={items}
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
                  rows={items}
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
