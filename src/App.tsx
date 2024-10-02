import React from 'react';
import './App.css';
import Header from './components/Header';
import Game from "./components/Game";


function App() {
    return (
        <>
            <header>
                <Header />
            </header>
            <div className="game">
                <Game />
            </div>
        </>
    )
}

export default App;
