import Style from "./style.module.css";
import React from "react";

interface SquareProps {
    value: string | null
    isWinner: boolean
    onSquareClick: () => void
}

function Square({value, isWinner, onSquareClick}: SquareProps) {

    return (
        <button className={Style.squareBase + (isWinner ? " "+ Style.winnerSquare : "") } onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;