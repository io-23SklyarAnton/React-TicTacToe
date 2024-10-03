import React from 'react';
import './App.css';
import Header from './components/Header';
import Game from "./components/Game";


function App() {
    return (
        <>
            <Header/>
            <div className="game">
                <Game/>
            </div>
        </>
    )
}

export default App;
