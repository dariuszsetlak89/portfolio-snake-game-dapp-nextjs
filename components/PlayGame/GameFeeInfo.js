export default function SnakeGame({ playGameT, gameFee, snakeBalance }) {
    return (
        <div className="ml-10">
            <div className="columns-2">
                <div className="text-right">{playGameT.gameFee}</div>
                <div className="text-left font-bold">{gameFee.toString()} SNAKE</div>
            </div>
            <div className="columns-2">
                <div className="text-right">{playGameT.snakeBalance}</div>
                <div className="text-left font-bold">{snakeBalance.toString()} SNAKE</div>
            </div>
        </div>
    );
}
