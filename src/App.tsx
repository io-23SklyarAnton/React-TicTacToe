import React from 'react';
import Header from './components/Header';
import Game from "./components/Game";
import Style from './components/style.module.css';


function App() {
    return (
        <>
            <Header/>
            <div className={Style.game}>
                <Game/>
            </div>
        </>
    )
}

export default App;
