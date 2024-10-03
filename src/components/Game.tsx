import Style from './style.module.css';
import Board from './Board';
import {useState} from 'react';
import React from "react";
import MySelect from "./UI/MySelect";

export interface SquareChanged {
    value: string;
    row: number;
    col: number;
}

export interface HistoryItem {
    board: Array<string | null>;
    changedSquare: SquareChanged | null;
}

function Game() {
    const [history, setHistory] = useState<HistoryItem[]>(
        [{
            board: Array(9).fill(null),
            changedSquare: null
        }]
    );
    const [currentMove, setCurrentMove] = useState(0);
    const [isHistoryAsc, setHistoryOrderAsc] = useState(true)
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].board;
    const [selectedHistorySort, setSelectedHistorySort] = useState("asc");

    function handlePlay(nextSquares: Array<string | null>, changeSquare: SquareChanged) {
        const newMove: HistoryItem = {
            board: nextSquares,
            changedSquare: changeSquare
        };
        const nextHistory = [...history.slice(0, currentMove + 1), newMove];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function handleHistorySortChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        setSelectedHistorySort(value);
        setHistoryOrderAsc(value === "asc");
    }

    const moves = history.map((historyItem, move) => {
        let changedSquareInfo: string = '';

        if (historyItem.changedSquare) {
            const changedSquareValue = historyItem.changedSquare.value;
            const changedSquareRow = historyItem.changedSquare.row;
            const changedSquareCol = historyItem.changedSquare.col;

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
            <li key={move} className={Style.historyListElement}>
                <button onClick={() => jumpTo(move)}>{description}. {changedSquareInfo}</button>
            </li>
        );
    });

    return (
        <div className={Style.game}>
            <div className={Style.gameBoard}>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className={Style.gameInfo}>
                <MySelect
                    defaultValue={"Select Ordering"}
                    options={[
                        {value: "asc", label: "Ascending"},
                        {value: "desc", label: "Descending"}
                    ]}
                    value={selectedHistorySort}
                    onChange={handleHistorySortChange}
                />

                <ul>{isHistoryAsc ? moves : [...moves].reverse()}</ul>
            </div>
        </div>
    );
}


export default Game;