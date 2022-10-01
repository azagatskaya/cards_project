import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {words, groupCellNames, wordCellNames} from '../data';

const WordsContext = React.createContext();

function WordsContextProvider(props) {
    const [data, setData] = useState(words);
    const [rows, setRows] = useState([]);
    const [tableDataType, setTableDataType] = useState('sets');
    const [activeSetId, setActiveSetId] = useState(null);
    const [activeWordId, setActiveWordId] = useState(0);
    const [cellPropNames, setCellPropNames] = useState(() =>
        getCellPropNames('sets'),
    );
    const [maxSetId, setMaxSetId] = useState();
    const [maxWordId, setMaxWordId] = useState();
    const [cardsCount, setCardsCount] = useState(rows.length);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const maxSet = getMaxSetId();
        setMaxSetId(maxSet);
        const maxWord = getMaxWordId();
        setMaxWordId(maxWord);
    }, [])

    useEffect(() => {
        if (error) navigate("/*");
        setError(false);
    }, [error])

    useEffect(() => {
        setCellPropNames(() => getCellPropNames(tableDataType));
    }, [tableDataType]);

    useEffect(() => {
        try {
            const items = getItems();
            const visibleRows = getRows(items);
            setRows(visibleRows);
        } catch (err) {
            setError(true);
        }
    }, [cellPropNames, data]);

    useEffect(() => {
        setCardsCount(rows.length);
    }, [rows])

    const getMaxSetId = () => {
        return data.map(set => set.id).sort((a, b) => b - a)[0] + 1;
    }

    const getMaxWordId = () => {
        const allWordId = [];
        data.map(set => {
            set.data.map(word => allWordId.push(word.id));
        });
        return allWordId.sort((a, b) => b - a)[0] + 1;
    }

    const handleSetSelect = (id) => {
        setTableDataType(id === null ? 'sets' : 'words');
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
                return el.id === Number(activeSetId);
            })[0].data;
    };

    const getRows = (items) => {
        let res = [];
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
        setData((prevState) => {
            return [...prevState, {
                data: [],
                id: maxSetId,
                name: values.rus_name,
                rus_name: values.rus_name,
                date: values.date,
            }];
        });
        setMaxSetId(prevState => prevState + 1);
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
                if (set.id === Number(activeSetId)) {
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
        const res = [...set.data, {...values, id: maxWordId}];
        setMaxWordId(prevState => prevState + 1);
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

    const validateRow = (obj) => {
        return Object.keys(obj).reduce((res, key) => {
            if (key === 'id' && obj[key] === '') return res;
            let cellValRes = validateCell(obj[key]);
            return (cellValRes !== false && res !== false) ?
                {...res, [key]: cellValRes} :
                false;
        }, {});
    }

    const validateCell = (val) => {
        if (typeof val === 'number') return val;
        else if (typeof val === 'string' && val.trim() !== '') return String(val).trim();
        else return false;
    }

    return (
        <WordsContext.Provider
            value={{
                tableDataType,
                cellPropNames,
                rows,
                activeWordId,
                cardsCount,
                changeData,
                addData,
                handleSetSelect,
                onReturnToHomePage, handleNextClick, handlePrevClick,
                validateRow, validateCell
            }}
        >
            {props.children}
        </WordsContext.Provider>
    );
}

export {WordsContextProvider, WordsContext};
