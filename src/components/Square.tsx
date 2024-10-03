import './style.css';
import React from "react";

interface SquareProps {
    value: string | null
    isWinner: boolean
    onSquareClick: () => void
}

function Square({value, isWinner, onSquareClick}: SquareProps) {

    return (
        <button className={"squareBase " + (isWinner ? "winnerSquare" : "") } onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;