import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import words from "./words.json";

function App() {
  const [data, setData] = useState(words);
  const [rows, setRows] = useState([]);
  const [tableDataType, setTableDataType] = useState("sets");
  const [activeSetId, setActiveSetId] = useState(null);
  const [activeWordId, setActiveWordId] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [cellPropNames, setCellPropNames] = useState([]);

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

  useEffect(() => {
    console.log("useEffect tableDataType");
    setHeaders(() => getHeaders(tableDataType));
    setCellPropNames(() => getCellPropNames(tableDataType));
  }, [tableDataType]);

  useEffect(() => {
    console.log("useEffect activeSetId");
    console.log("data", data);
    setCellPropNames(() => getCellPropNames(tableDataType));
    // let items = null;
    // if (activeSetId === null) {
    //   items = data;
    // } else if (typeof activeSetId === "number") {
    //   items = data.filter((el) => {
    //     return el.id === activeSetId;
    //   })[0].data;
    // }
    // // const propNames = getCellPropNames(activeSetId === null ? "sets" : "words");
    // let res = [];
    // items.map((elem) => {
    //   let newRow = {};
    //   cellPropNames.map((cell) => {
    //     if (elem.hasOwnProperty(cell) || cell === "numberOfCards") {
    //       const initialValue =
    //         cell === "numberOfCards" ? elem.data.length : elem[cell];
    //       newRow = { ...newRow, [cell]: initialValue };
    //     }
    //     return newRow;
    //   });
    //   res = [...res, newRow];
    //   return res;
    // });
    // console.log("activeWordId", activeWordId);
    // setRows(res);
  }, [activeSetId, data]);

  useEffect(() => {
    console.log("useEffect cellPropNames");
    console.log("cellPropNames", cellPropNames);

    let items = null;
    if (activeSetId === null) {
      items = data;
    } else if (typeof activeSetId === "number") {
      items = data.filter((el) => {
        return el.id === activeSetId;
      })[0].data;
    }
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
    console.log("activeWordId", activeWordId);
    setRows(res);
  }, [cellPropNames]);

  const changeWord = (rowId, values) => {
    setData((prevState) => {
      return prevState.map((set) => {
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
        return changedData.length === 0
          ? { ...set }
          : { ...set, ["data"]: [...changedData] };
      });
    });
  };
  const changeSet = (rowId, values) => {
    setData((prevState) => {
      return prevState.map((set) => {
        let changedData = {};
        if (set.id === rowId) {
          changedData = { ...set, ...values };
        }
        return changedData !== {} ? { ...set, ...changedData } : { ...set };
      });
    });
  };

  const changeData = (rowId, values) => {
    switch (tableDataType) {
      case "sets":
        changeSet(rowId, values);
        break;
      case "words":
        changeWord(rowId, values);
        break;
      default:
        throw new Error("Unknown table data type");
    }
  };

  const deleteSet = (rowId) => {
    console.log("deleteSet");
    setData((prevState) => prevState.filter((set) => set.id !== rowId));
  };

  const deleteWord = (rowId) => {
    console.log("deleteWord");
    setData((prevState) => {
      const newData = prevState.map((set) => {
        let changedData = [];
        if (set.id === activeSetId) {
          changedData = set.data.filter((row) => row.id !== rowId);
        }
        return changedData !== []
          ? { ...set, ["data"]: [...changedData] }
          : { ...set };
      });
      return newData;
    });
  };
  const deleteData = (rowId) => {
    console.log("deleteData");
    switch (tableDataType) {
      case "sets":
        deleteSet(rowId);
        break;
      case "words":
        deleteWord(rowId);
        break;
      default:
        throw new Error("Unknown table data type");
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
    console.log("getCellPropNames");
    if (tableDataType === "sets") {
      return ["id", "rus_name", "numberOfCards", "date"];
    } else if (tableDataType === "words") {
      return ["id", "word", "transcription", "value", "tags"];
    } else {
      throw new Error("unknown table data type");
    }
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
                  handleDelete={deleteData}
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
                  handleDelete={deleteData}
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
