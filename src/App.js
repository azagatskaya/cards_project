import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import words from "./words.json";

let url = "";

function App() {
  const [data, setData] = useState(words);
  const [rows, setRows] = useState([]);
  const [tableDataType, setTableDataType] = useState("sets");
  const [activeSetId, setActiveSetId] = useState(null);
  const [activeWordId, setActiveWordId] = useState(0);
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
    console.log("useEffect tableDataType");
    setHeaders(() => getHeaders(tableDataType));
    setCellPropNames(() => getCellPropNames(tableDataType));
  }, [tableDataType]);

  useEffect(() => {
    console.log("useEffect activeSetId");
    let items = null;
    if (activeSetId === null) {
      items = data;
    } else if (typeof activeSetId === "number") {
      items = data.filter((el) => {
        return el.id === activeSetId;
      })[0].data;
    }
    let res = [];
    const propNames = getCellPropNames(activeSetId === null ? "sets" : "words");
    items.map((elem) => {
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
    console.log("res", res);
    setRows(res);
  }, [activeSetId]);

  const handleSaveChanges = (rowId, values) => {
    console.log("handleSaveChanges");
    changeData(rowId, values);
  };

  const changeData = (rowId, values) => {
    setData((prevState) => {
      const newData = prevState.map((set) => {
        let changedData = [];
        if (set.id === activeSetId) {
          changedData = set.data.map((row) => {
            let changedRow = {};
            if (row.id === rowId) {
              changedRow = { ...row, ...values };
            }
            return { ...row, ...changedRow };
          });
        }
        return changedData !== []
          ? { ...set, ["data"]: [...changedData] }
          : { ...set };
      });
      return newData;
    });
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
    setTableDataType("words");
    setActiveSetId(id);
  };

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
                  headers={headers}
                  cellPropNames={cellPropNames}
                  rows={rows}
                  handleSaveChanges={handleSaveChanges}
                  handleSetSelect={handleSetSelect}
                />
              }
            />
            <Route
              exact
              path="/study"
              element={
                <StudyPage
                  headers={headers}
                  cellPropNames={cellPropNames}
                  rows={rows}
                  handleSaveChanges={handleSaveChanges}
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
