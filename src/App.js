import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import {
  words,
  setHeader,
  wordHeader,
  setCellNames,
  wordCellNames,
} from "./data.js";

function App() {
  const [data, setData] = useState(words);
  const [rows, setRows] = useState([]);
  const [tableDataType, setTableDataType] = useState("sets");
  const [activeSetId, setActiveSetId] = useState(null);
  const [activeWordId, setActiveWordId] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [cellPropNames, setCellPropNames] = useState(() =>
    getCellPropNames("sets")
  );

  useEffect(() => {
    setCellPropNames(() => getCellPropNames(tableDataType));
    setHeaders(() => getHeaders(tableDataType));
  }, [tableDataType]);

  useEffect(() => {
    const items = getItems();
    const visibleRows = getRows(items);
    setRows(visibleRows);
  }, [cellPropNames, data]);

  const handleSetSelect = (id) => {
    setTableDataType("words");
    setActiveSetId(id);
  };

  const onReturnToHomePage = () => {
    setActiveSetId(null);
    setTableDataType("sets");
    setActiveWordId(0);
  };

  const handleNextClick = () => {
    setActiveWordId((prevState) =>
      prevState === rows.length - 1 ? 0 : prevState + 1
    );
  };
  const handlePrevClick = () => {
    setActiveWordId((prevState) =>
      prevState === 0 ? rows.length - 1 : prevState - 1
    );
  };

  const getItems = () => {
    return activeSetId === null
      ? data
      : data.filter((el) => {
          return el.id === activeSetId;
        })[0].data;
  };

  const getRows = (items) => {
    let res = [];
    items.map((elem) => {
      let newRow = {};
      cellPropNames.map((cell) => {
        if (elem.hasOwnProperty(cell) || cell === "numberOfCards") {
          const initialValue =
            cell === "numberOfCards" ? elem.data.length : elem[cell];
          newRow = { ...newRow, [cell]: initialValue };
        }
        return newRow;
      });
      res = [...res, newRow];
      return res;
    });
    return res;
  };

  const changeData = (rowId, values) => {
    tableDataType === "words"
      ? handleWordOperation(rowId, values)
      : changeSet(rowId, values);
  };

  const handleWordOperation = (rowId, values) => {
    setData((prevState) => {
      return prevState.map((set) => {
        let changedData = [];
        if (set.id === activeSetId) {
          changedData =
            typeof values === "undefined"
              ? deleteWrd(set, rowId)
              : changeWord(set, rowId, values);
        }
        return changedData.length === 0
          ? { ...set }
          : { ...set, ["data"]: [...changedData] };
      });
    });
  };

  const deleteWrd = (set, rowId) => {
    return set.data.filter((row) => row.id !== rowId);
  };

  const changeWord = (set, rowId, values) => {
    return set.data.map((row) => {
      let changedRow = {};
      if (row.id === rowId) {
        changedRow = { ...row, ...values };
      }
      return { ...row, ...changedRow };
    });
  };

  const changeSet = (rowId, values) => {
    typeof values === "undefined"
      ? deleteSet(rowId)
      : setData((prevState) => {
          return prevState.map((set) => {
            let changedData = {};
            if (set.id === rowId) {
              changedData = { ...set, ...values };
            }
            return changedData !== {} ? { ...set, ...changedData } : { ...set };
          });
        });
  };

  const deleteSet = (rowId) => {
    setData((prevState) => prevState.filter((set) => set.id !== rowId));
  };

  function getHeaders(tableDataType) {
    return tableDataType === "sets" ? setHeader : wordHeader;
  }

  function getCellPropNames(tableDataType) {
    return tableDataType === "sets" ? setCellNames : wordCellNames;
  }

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
                  handleSaveChanges={changeData}
                  handleDelete={changeData}
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
                  handleSaveChanges={changeData}
                  handleDelete={changeData}
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
