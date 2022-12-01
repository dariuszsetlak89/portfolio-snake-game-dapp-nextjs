import { useState } from "react";
import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import LoadingSpinner from "../../Animations/LoadingSpinner";

export default function AirdropModal({
    isVisible,
    snakeGameAddress,
    snakeGameAbi,
    updateUI,
    snakeAirdropAmount,
    onClose,
}) {
    /////////////////
    // State Hooks //
    /////////////////
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: snakeAirdrop
    const { runContractFunction: snakeAirdrop } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "snakeAirdrop",
        params: {},
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle SNAKE airdrop function
    const handleSnakeAirdrop = async () => {
        // Turn on loading wheel animation
        setShowLoadingSpinner(true);
        // Run contract function: snakeAirdrop
        await snakeAirdrop({
            onError: (error) => console.log(error),
            onSuccess: handleSnakeAirdropSuccess,
        });
    };

    // Handle SNAKE airdrop success function
    const handleSnakeAirdropSuccess = async (tx) => {
        await tx.wait(1);
        // SNAKE airdrop notification
        dispatch({
            type: "success",
            message: "SNAKE airdrop received!",
            title: "SNAKE airdrop received",
            position: "bottomL",
        });
        // Turn off loading wheel animation
        setShowLoadingSpinner(false);
        // UpdateUI
        updateUI();
        // Close modal
        onClose();
    };

    return (
        <Modal
            title={<div className="modalTitle">SNAKE tokens airdrop</div>}
            isVisible={isVisible}
            width="650px"
            onCloseButtonPressed={onClose}
            customFooter={<p>SNAKE tokens airdrop</p>}
        >
            <div className="modalContent">
                SNAKE tokens airdrop amount: <span className="font-bold">{snakeAirdropAmount} SNAKE</span>
            </div>
            <div className="modalButton">
                {showLoadingSpinner == false ? (
                    <div>
                        {/* SNAKE airdrop button */}
                        <button type="button" className="myButtonLime" onClick={handleSnakeAirdrop}>
                            Claim airdrop
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
