import { useState } from "react";
import Image from "next/image";
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
        readNativeCurrencyName(chainId);
        // Show buy SNAKE modal
        setShowBuyModal(true);
        // console.log("Show buy SNAKE modal!");
    };

    //////////////////////
    // Helper Functions //
    //////////////////////

    // Native currency name
    const readNativeCurrencyName = (chainId) => {
        switch (chainId) {
            case 31337:
                setNativeCurrencyName("Hardhat ETH");
                break;
            case 1:
                setNativeCurrencyName("ETH");
                break;
            case 5:
                setNativeCurrencyName("Goerli ETH");
                break;
            case 137:
                setNativeCurrencyName("MATIC");
                break;
            case 80001:
                setNativeCurrencyName("Mumbai MATIC");
                break;
            default:
                setNativeCurrencyName("");
        }
    };

    return (
        <div className="card">
            {/* SNAKE token card */}
            <div className="flex justify-between">
                <div className="cardTitle">SNAKE token card</div>
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
