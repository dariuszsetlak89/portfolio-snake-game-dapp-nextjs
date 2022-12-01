import { useState } from "react";
import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import LoadingSpinner from "../../Animations/LoadingSpinner";

export default function BuyModal({
    isVisible,
    snakeGameAddress,
    snakeGameAbi,
    snakeNftAddress,
    nftAbi,
    updateUI,
    snakeNftRequired,
    superPetNftMintFee,
    snakeNftBalance,
    nativeCurrencyName,
    account,
    onClose,
}) {
    /////////////////
    // State Hooks //
    /////////////////
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [snakeNftBalanceTooLow, setSnakeNftBalanceTooLow] = useState(false);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: isApprovedForAll
    const { runContractFunction: isApprovedForAll } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: snakeNftAddress,
        functionName: "isApprovedForAll",
        params: {
            owner: account,
            operator: snakeGameAddress,
        },
    });

    // Contract function: setApprovalForAll
    const { runContractFunction: setApprovalForAll } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: snakeNftAddress,
        functionName: "setApprovalForAll",
        params: {
            operator: snakeGameAddress,
            approved: true,
        },
    });

    // Contract function: mintSuperPetNftFunction
    const { runContractFunction: mintSuperPetNft } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "mintSuperPetNft",
        msgValue: superPetNftMintFee,
        params: {},
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle mint SuperPet NFT button function
    const handleMintSuperPetNftButton = async () => {
        if (Number(snakeNftBalance.toString()) >= Number(snakeNftRequired.toString())) {
            setSnakeNftBalanceTooLow(false);
            // Turn on loading spinner animation
            setShowLoadingSpinner(true);
            // Run contract function: snakeNftAllowanceFunction - check Snake NFT spend/burn allowance
            const snakeNftIsApprovedForAll = await isApprovedForAll();
            // console.log("snakeNftIsApprovedForAll:", snakeNftIsApprovedForAll.toString());
            if (snakeNftIsApprovedForAll == false) {
                handleSnakeNftSetApproveForAll();
            } else {
                handleMintSuperPetNft();
            }
        } else {
            // Turn off loading spinner animation
            setShowLoadingSpinner(false);
            // Error: Snake NFT balance too low!
            setSnakeNftBalanceTooLow(true);
            console.log("SNAKE balance too low!");
            console.log("snakeNftBalanceTooLow:", snakeNftBalanceTooLow);
        }
    };

    // Handle Snake NFT approval function
    const handleSnakeNftSetApproveForAll = async () => {
        // Run contract function: snakeNftSetApproveFunction
        await setApprovalForAll({
            onError: (error) => console.log(error),
            onSuccess: handleMintSuperPetNft,
        });
    };

    // Handle mint SuperPet NFT function
    const handleMintSuperPetNft = async () => {
        // Run contract function: mintSuperPetNft
        await mintSuperPetNft({
            onError: (error) => console.log(error),
            onSuccess: handleMintSuperPetNftSuccess,
        });
    };

    // Handle mint SuperPet NFT success function
    const handleMintSuperPetNftSuccess = async (tx) => {
        await tx.wait(1);
        // SuperPet NFT minted notification
        dispatch({
            type: "success",
            message: "SuperPet NFT minted!",
            title: "SuperPet NFT minted",
            position: "bottomL",
        });
        // Turn off loading spinner animation
        setShowLoadingSpinner(false);
        // UpdateUI
        updateUI();
        // Close modal
        onClose();
    };

    return (
        <Modal
            title={<div className="modalTitle">Mint SuperPet NFT</div>}
            isVisible={isVisible}
            width="650px"
            onCloseButtonPressed={onClose}
            customFooter={<p>Mint SuperPet NFT</p>}
        >
            <div className="modalContent">
                <div className="modalColumns">
                    <div className="modalDescription modalColumn1">Currency mint fee: </div>
                    <div className="modalDescription modalColumn2">
                        {ethers.utils.formatUnits(superPetNftMintFee)} {nativeCurrencyName}
                    </div>
                </div>
                <div className="modalColumns">
                    <div className="modalDescription modalColumn1">NFT mint fee (burn): </div>
                    <div className="modalDescription modalColumn2">{snakeNftRequired} SNFT</div>
                </div>
                <div className="modalColumns">
                    <div className="modalDescription modalColumn1">Snake NFT balance: </div>
                    <div className="modalDescription modalColumn2">{snakeNftBalance} SNFT</div>
                </div>
            </div>
            {/* Claim SuperPet NFT button */}
            <div className="h-40 flex justify-center items-center">
                {showLoadingSpinner == false ? (
                    <div>
                        {snakeNftBalanceTooLow == false ? (
                            <button type="button" className="myButtonLime" onClick={handleMintSuperPetNftButton}>
                                Mint NFT
                            </button>
                        ) : (
                            <div className="error">Snake NFT balance too low!</div>
                        )}
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
