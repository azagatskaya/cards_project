import {Routes, Route} from 'react-router-dom';
import React from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import StudyPage from './pages/StudyPage.jsx';
import Page404 from './pages/Page404.jsx';
import {WordsContextProvider} from "./context/wordsContext";

function App() {
    return (
        <WordsContextProvider>
            <div className={styles.App}>
                <Header/>
                <main className={styles.main}>
                    <div className={styles.main__wrapper}>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <Home/>
                                }
                            />
                            <Route
                                exact
                                path="/study/:id"
                                element={
                                    <StudyPage/>
                                }
                            />
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </div>
                </main>
                <Footer/>
            </div>
        </WordsContextProvider>
    );
}

export default App;
