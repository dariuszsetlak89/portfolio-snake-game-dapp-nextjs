import { useState } from "react";
import { Modal, Input, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import LoadingSpinner from "../../_Helpers_/LoadingSpinner";

export default function BuyModal({
    isVisible,
    snakeGameAddress,
    snakeGameAbi,
    updateUI,
    snakeExchangeRate,
    nativeCurrencyName,
    onClose,
}) {
    /////////////////
    // State Hooks //
    /////////////////
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [buyAmount, setBuyAmount] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: buySnake
    const { runContractFunction: buySnake } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "buySnake",
        msgValue: buyPrice,
        params: {
            _snakeAmount: buyAmount,
        },
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle input field
    const handleInputField = async (event) => {
        // Buy amount
        const buyAmount = event.target.value;
        setBuyAmount(buyAmount);
        // console.log("Buy amount:", buyAmount);
        // Buy price
        const buyPrice = (event.target.value * snakeExchangeRate).toString();
        setBuyPrice(buyPrice);
        // console.log("Buy price:", buyPrice);
    };

    // Handle SNAKE airdrop function
    const handleBuySnake = async () => {
        // Turn on loading wheel animation
        setShowLoadingSpinner(true);
        // Run contract function: buySnake
        await buySnake({
            onError: (error) => console.log(error),
            onSuccess: handleBuySnakeSuccess,
        });
    };

    // Handle SNAKE airdrop success function
    const handleBuySnakeSuccess = async (tx) => {
        await tx.wait(1);
        // Buy SNAKE notification
        dispatch({
            type: "success",
            message: "SNAKE tokens bought successfully!",
            title: "SNAKE tokens bought",
            position: "bottomL",
        });
        // Reset input field
        setBuyAmount("0");
        // Turn off loading wheel animation
        setShowLoadingSpinner(false);
        // UpdateUI
        updateUI();
        // Close modal
        onClose();
    };

    return (
        <Modal
            title={<div className="buyModalTitle">Buy SNAKE tokens</div>}
            isVisible={isVisible}
            width="650px"
            onCloseButtonPressed={onClose}
            customFooter={<p>Buy SNAKE tokens</p>}
        >
            <div className="modalContent">How many SNAKE tokens do you want to buy?</div>
            <div className="modalInput">
                {/* Buy amount input field */}
                <Input
                    label="Buy amount"
                    name="Buy tokens amount"
                    type="number"
                    width="200px"
                    onChange={handleInputField}
                />
            </div>
            <div className="modalDescription">
                SNAKE tokens buy price:{" "}
                <span className="font-bold">
                    {ethers.utils.formatUnits(buyPrice)} {nativeCurrencyName}
                </span>
            </div>
            <div className="modalButton">
                {showLoadingSpinner == false ? (
                    <div>
                        {/* Buy SNAKE tokens button */}
                        <button type="button" className="myButtonLime" onClick={handleBuySnake}>
                            Buy SNAKE
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Loading spinner animation */}
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </Modal>
    );
}
