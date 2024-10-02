import './style.css';
import Board from './Board';
import {useState} from 'react';

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isHistoryAsc, setHistoryOrderAsc] = useState(true)
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: Array<string>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function handleReverseHistory(){
        setHistoryOrderAsc(!isHistoryAsc)
    }

    const moves = history.map((_, move) => {
        let description;
        if (move === 0) {
            description = 'Go to game start';
        } else if (move === currentMove) {
            return (
                <li key={move}>
                    <p>{"You are at move #"}{currentMove}</p>
                </li>
            );
        } else {
            description = 'Go to move #' + move;
        }
        return (
            <li key={move} className={"historyListElement"}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ul>{ isHistoryAsc ? moves : [...moves].reverse()}</ul>
                <button onClick={handleReverseHistory}>Reverse history</button>
            </div>
        </div>
    );
}


export default Game;