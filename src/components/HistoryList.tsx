import React, {useMemo} from 'react';
import Style from "./style.module.css";

interface HistoryListProps {
    history: Array<{ changedSquare: { value: string, row: number, col: number } | null }>
    currentMove: number
    jumpTo: (move: number) => void
    isHistoryAsc: boolean
}

const HistoryList = ({history, currentMove, jumpTo, isHistoryAsc}: HistoryListProps) => {
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

    const sortedHistory = useMemo(() => {
            console.log("sortedHistory");
            if (isHistoryAsc) {
                return moves;
            }
            return [...moves].reverse();
        },
        [moves, isHistoryAsc]);
    return (
        <>
            <ul>{sortedHistory}</ul>
        </>
    );
};

export default HistoryList;