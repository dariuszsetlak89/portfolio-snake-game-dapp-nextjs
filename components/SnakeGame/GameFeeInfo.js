export default function SnakeGame({ gameFee, snakeBalance }) {
    return (
        <div className="ml-10">
            <div className="columns-2">
                <div className="text-right">Game fee:</div>
                <div className="text-left font-bold">{gameFee.toString()} SNAKE</div>
            </div>
            <div className="columns-2">
                <div className="text-right">SNAKE balance:</div>
                <div className="text-left font-bold">{snakeBalance.toString()} SNAKE</div>
            </div>
        </div>
    );
}
