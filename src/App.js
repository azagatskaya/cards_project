import {Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import StudyPage from './pages/StudyPage.jsx';
import Page404 from './pages/Page404.jsx';

import {words, groupCellNames, wordCellNames} from './data.js';

function App() {
  const [data, setData] = useState(words);
  const [rows, setRows] = useState([]);
  const [tableDataType, setTableDataType] = useState('sets');
  const [activeSetId, setActiveSetId] = useState(null);
  const [activeWordId, setActiveWordId] = useState(0);
  const [cellPropNames, setCellPropNames] = useState(() =>
    getCellPropNames('sets'),
  );

  useEffect(() => {
    setCellPropNames(() => getCellPropNames(tableDataType));
  }, [tableDataType]);

  useEffect(() => {
    const items = getItems();
    const visibleRows = getRows(items);
    setRows(visibleRows);
  }, [cellPropNames, data]);

  const handleSetSelect = (id) => {
    setTableDataType('words');
    setActiveSetId(id);
  };

  const onReturnToHomePage = () => {
    setActiveSetId(null);
    setTableDataType('sets');
    setActiveWordId(0);
  };

  const handleNextClick = () => {
    setActiveWordId((prevState) =>
            prevState === rows.length - 1 ? 0 : prevState + 1,
    );
  };
  const handlePrevClick = () => {
    setActiveWordId((prevState) =>
            prevState === 0 ? rows.length - 1 : prevState - 1,
    );
  };

  const getItems = () => {
    return activeSetId === null ?
            data :
            data.filter((el) => {
              return el.id === activeSetId;
            })[0].data;
  };

  const getRows = (items) => {
    let res = [];
    // if (items.length > 0) {
    items.map((elem) => {
      let newRow = {};
      cellPropNames.map((cell) => {
        newRow = getCell(elem, cell.id, newRow);
        return newRow;
      });
      res = [...res, newRow];
      return res;
    });
    return res;
  };

  const getCell = (elem, cell, newRow) => {
    if (elem.hasOwnProperty(cell) || cell === 'numberOfCards') {
      const initialValue = cell === 'numberOfCards' ?
                elem.data.length :
                elem[cell];
      newRow = {...newRow, [cell]: initialValue};
    }
    return newRow;
  };

  const addSet = (values) => {
    console.log('values', values);
    setData((prevState) => {
      return [...prevState, {
        data: [],
        id: 777,
        name: values.rus_name,
        rus_name: values.rus_name,
        date: values.date,
      }];
    });
  };

  const addData = (values) => {
        tableDataType === 'words' ?
            handleWordOperation(values) :
            addSet(values);
  };

  const changeData = (rowId, values) => {
        tableDataType === 'words' ?
            handleWordOperation(rowId, values) :
            changeSet(rowId, values);
  };

  const handleWordOperation = (rowId, values) => {
    setData((prevState) => {
      return prevState.map((set) => {
        let newData = [];
        if (set.id === activeSetId) {
          newData = typeof rowId === 'object' ?
                        addWord(set, rowId) :
                        typeof values === 'undefined' ?
                            deleteWord(set, rowId) :
                            changeWord(set, rowId, values);
        }
        return newData.length === 0 ?
                    {...set} :
                    {...set, ['data']: [...newData]};
      });
    });
  };

  const filterId = (data, id) => data.id !== id;

  const deleteWord = (set, rowId) => {
    return set.data.filter((row) => filterId(row, rowId));
  };

  const deleteSet = (rowId) => {
    setData((prevState) => prevState.filter((set) => filterId(set, rowId)));
  };
  const addWord = (set, values) => {
    const res = [...set.data, {...values, id: 888}];
    return res;
  };
  const changeWord = (set, rowId, values) => {
    return set.data.map((row) => {
      let newRow = {};
      if (row.id === rowId) newRow = {...row, ...values};
      return {...row, ...newRow};
    });
  };

  const changeSet = (rowId, values) => {
        typeof values === 'undefined' ?
            deleteSet(rowId) :
            setData((prevState) => {
              return prevState.map((set) => {
                let changedData = {};
                if (set.id === rowId) changedData = {...set, ...values};
                return Object.keys(changedData).length !== 0 ?
                        {...set, ...changedData} :
                        {...set};
              });
            });
  };

  function getCellPropNames(tableDataType) {
    return tableDataType === 'sets' ? groupCellNames : wordCellNames;
  }

  return (
    <div className={styles.App}>
      <Header onReturnToHomePage={onReturnToHomePage}/>
      <main className={styles.main}>
        <div className={styles.main__wrapper}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  headers={cellPropNames}
                  rows={rows}
                  handleSaveChanges={changeData}
                  handleDelete={changeData}
                  handleSetSelect={handleSetSelect}
                  handleAddNewItem={addData}
                />
              }
            />
            <Route
              exact
              path="/study/:id"
              element={
                <StudyPage
                  headers={cellPropNames}
                  rows={rows}
                  handleSaveChanges={changeData}
                  handleDelete={changeData}
                  activeWordId={activeWordId}
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                  handleAddNewItem={addData}
                />
              }
            />
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
