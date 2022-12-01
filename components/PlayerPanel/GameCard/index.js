import Link from "next/link";
import Image from "next/image";

export default function GamesCard({ updateUI, gamesPlayed, lastScore, bestScore, gameStartedFlag }) {
    //////////////////
    // UI Functions //
    //////////////////

    // Update card function
    const updateCard = async () => {
        await updateUI();
    };

    return (
        <div className="card">
            {/* Game card */}
            <div className="flex justify-between">
                <div className="cardTitle">Player games card</div>
                {/* UpdateUI button */}
                <div className="refreshButtonSmall">
                    <Image
                        src="/images/refresh.png"
                        alt="Refresh button"
                        width={24}
                        height={24}
                        onClick={updateCard}
                        className="hover:animate-spin"
                    />
                </div>
            </div>
            <div className="cardContent">
                {/* Player's game data */}
                <div className="cardColumns">
                    <div className="cardColumn1">Game started:</div>
                    <div className="cardColumn2">{gameStartedFlag.toString().toUpperCase()}</div>
                </div>
                <div className="cardColumns">
                    <div className="cardColumn1">Games played:</div>
                    <div className="cardColumn2">{gamesPlayed.toString()} games</div>
                </div>
                <div className="cardColumns">
                    <div className="cardColumn1">Last score:</div>
                    <div className="cardColumn2">{lastScore.toString()} points</div>
                </div>
                <div className="cardColumns">
                    <div className="cardColumn1">Best score:</div>
                    <div className="cardColumn2">{bestScore.toString()} points</div>
                </div>
            </div>
        </div>
    );
}
