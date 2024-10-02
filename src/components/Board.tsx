import React from 'react';
import Square from './Square';
import './style.css';

interface BoardProps {
    xIsNext: boolean
    squares: Array<string>
    onPlay: (nextSquares: Array<string>) => void
}

function Board({xIsNext, squares, onPlay, }: BoardProps) {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }

    return (
        <div>
            <div className="status">{status}</div>
            {[0, 1, 2].map((index) => {
                const squaresRow = squares.slice(index * 3, index * 3 + 3)
                return <BoardRow rowIndex={index} squares={squaresRow} handleClick={handleClick} />
            })}
        </div>
    );
}

interface BoardRowProps {
    rowIndex: number
    squares: Array<string>
    handleClick: (i: number) => void
}

function BoardRow({rowIndex, squares, handleClick}: BoardRowProps) {
    return (
        <div className="board-row">
            {squares.map((square, index) => {
                const squareIndex = 3 * rowIndex + index
                return <Square key={squareIndex} value={square} onSquareClick={() => handleClick(squareIndex)}/>
            })}
        </div>
    );
}

function calculateWinner(squares: Array<string>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

            return squares[a];
        }
    }
    return null;
}

export default Board;