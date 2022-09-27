import {words, groupCellNames, wordCellNames} from './data.js';
import {useEffect, useState} from "react";

const useStudyLangService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }


    //-----------------------

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

    useEffect(() => {
        const maxSet = getMaxSetId();
        setMaxSetId(maxSet);
        const maxWord = getMaxWordId();
        setMaxWordId(maxWord);
    })
    useEffect(() => {
        setCellPropNames(() => getCellPropNames(tableDataType));
    }, [tableDataType]);

    useEffect(() => {
        const items = getItems();
        const visibleRows = getRows(items);
        setRows(visibleRows);
    }, [cellPropNames, data]);

    const getMaxSetId = () => {
        return data.map(set => set.id).sort((a, b) => b - a)[0] + 1;
    }
    const getMaxWordId = () => {
        const allWordId = [];
        data.map(set => {
            set.data.map(word => allWordId.push(word.id));
        });
        console.log('allWordId', allWordId)
        return allWordId.sort((a, b) => b - a)[0] + 1;
    }
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


    //-----------------------


    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;