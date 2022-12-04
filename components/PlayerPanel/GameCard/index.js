import RefreshButton from "../../_Helpers_/RefreshButton";

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
                <div>
                    <RefreshButton
                        buttonStyle={"refreshButtonSmall"}
                        buttonWidth={24}
                        buttonHeight={24}
                        onClickAction={updateCard}
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
