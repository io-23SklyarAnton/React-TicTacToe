import './style.css';
import Board from './Board';
import {useState} from 'react';

export interface SquareChanged {
    value: string;
    row: number;
    col: number;
}

export interface HistoryItem {
    board: Array<string | null>;
    changeSquare: SquareChanged | null;
}

function Game() {
    const [history, setHistory] = useState<HistoryItem[]>(
        [{
            board: Array(9).fill(null),
            changeSquare: null
        }]
    );
    const [currentMove, setCurrentMove] = useState(0);
    const [isHistoryAsc, setHistoryOrderAsc] = useState(true)
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].board;

    function handlePlay(nextSquares: Array<string | null>, changeSquare: SquareChanged) {
        const newMove: HistoryItem = {
            board: nextSquares,
            changeSquare: changeSquare
        };
        const nextHistory = [...history.slice(0, currentMove + 1), newMove];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function handleReverseHistory() {
        setHistoryOrderAsc(!isHistoryAsc)
    }

    const moves = history.map((historyItem, move) => {
        let changedSquareInfo: string = '';

        if (historyItem.changeSquare) {
            const changedSquareValue = historyItem.changeSquare.value;
            const changedSquareRow = historyItem.changeSquare.row;
            const changedSquareCol = historyItem.changeSquare.col;

            changedSquareInfo = `${changedSquareValue} at (row: ${changedSquareRow + 1}, column: ${changedSquareCol + 1})`;
        }

        let description;
        if (move === 0) {
            description = 'Go to game start';
        } else if (move === currentMove) {
            return (
                <li key={move}>
                    <p>
                        {"You are at move #"}{currentMove}. {changedSquareInfo}
                    </p>
                </li>
            );
        } else {
            description = 'Go to move #' + move;
        }
        return (
            <li key={move} className={"historyListElement"}>
                <button onClick={() => jumpTo(move)}>{description}. {changedSquareInfo}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ul>{isHistoryAsc ? moves : [...moves].reverse()}</ul>
                <button onClick={handleReverseHistory}>Reverse history</button>
            </div>
        </div>
    );
}


export default Game;