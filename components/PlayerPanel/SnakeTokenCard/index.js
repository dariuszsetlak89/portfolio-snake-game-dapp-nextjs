import { useState } from "react";
import readNativeCurrencyName from "../../_Helpers_/readNativeCurrencyName";
import RefreshButton from "../../_Helpers_/RefreshButton";
import AirdropModal from "./AirdropModal";
import BuyModal from "./BuyModal";

export default function SnakeCard({
    updateUI,
    snakeGameAddress,
    snakeGameAbi,
    snakeAirdropFlag,
    snakeBalance,
    gameFee,
    snakeAirdropAmount,
    snakeExchangeRate,
    chainId,
}) {
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showAirdropModal, setShowAirdropModal] = useState(false);
    const hideAirdropModal = () => setShowAirdropModal(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const hideBuyModal = () => setShowBuyModal(false);
    const [nativeCurrencyName, setNativeCurrencyName] = useState("");

    //////////////////
    // UI Functions //
    //////////////////

    // Update card function
    const updateCard = async () => {
        await updateUI();
    };

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle SNAKE airdrop button click function
    const handleAirdropButtonClick = () => {
        // Show SNAKE airdrop modal
        snakeAirdropFlag == false ? setShowAirdropModal(true) : "";
        // console.log("Show SNAKE airdrop modal!");
    };

    // Handle buy button click function
    const handleBuyButtonClick = () => {
        // Read native currency name
        setNativeCurrencyName(readNativeCurrencyName(chainId));
        // Show buy SNAKE modal
        setShowBuyModal(true);
        // console.log("Show buy SNAKE modal!");
    };

    return (
        <div className="card">
            {/* SNAKE token card */}
            <div className="flex justify-between">
                <div className="cardTitle">SNAKE token card</div>
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
                <div className="cardColumns">
                    <div className="cardColumn1">Airdrop received:</div>
                    <div className="cardColumn2">{snakeAirdropFlag.toString().toUpperCase()}</div>
                </div>
                <div className="cardColumns">
                    <div className="cardColumn1">SNAKE tokens balance:</div>
                    <div className="cardColumn2">{snakeBalance.toString()} SNAKE</div>
                </div>
                <div className="cardColumns">
                    <div className="cardColumn1">Player's game fee:</div>
                    <div className="cardColumn2">{gameFee.toString()} SNAKE</div>
                </div>
                <div className="mt-3 flex justify-center">
                    {snakeAirdropFlag == false ? (
                        <div>
                            {/* SNAKE airdrop button */}
                            <button type="button" className="myButtonLimeSmall" onClick={handleAirdropButtonClick}>
                                SNAKE airdrop
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* Buy SNAKE button */}
                    <button type="button" className="myButtonLimeSmall" onClick={handleBuyButtonClick}>
                        Buy SNAKE
                    </button>
                </div>
                {/* SNAKE Airdrop modal */}
                <AirdropModal
                    isVisible={showAirdropModal}
                    snakeGameAddress={snakeGameAddress}
                    snakeGameAbi={snakeGameAbi}
                    updateUI={updateUI}
                    snakeAirdropAmount={snakeAirdropAmount}
                    onClose={hideAirdropModal}
                />
                {/* Buy SNAKE modal */}
                <BuyModal
                    isVisible={showBuyModal}
                    snakeGameAddress={snakeGameAddress}
                    snakeGameAbi={snakeGameAbi}
                    updateUI={updateUI}
                    snakeExchangeRate={snakeExchangeRate}
                    nativeCurrencyName={nativeCurrencyName}
                    onClose={hideBuyModal}
                />
            </div>
        </div>
    );
}
