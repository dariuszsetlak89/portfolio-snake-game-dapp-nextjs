import { useState } from "react";
import readNativeCurrencyName from "../../_Helpers_/readNativeCurrencyName";
import RefreshButton from "../../_Helpers_/RefreshButton";
import MintModal from "./MintModal";

export default function SuperPetNftCard({
    updateUI,
    snakeGameAddress,
    snakeGameAbi,
    snakeNftAddress,
    superPetNftAddress,
    nftAbi,
    superPetNftClaimFlag,
    snakeNftRequired,
    superPetNftMintFee,
    maxSuperPetNfts,
    superPetNftMinted,
    superPetNftBalance,
    snakeNftBalance,
    chainId,
    account,
}) {
    const [showMintModal, setShowMintModal] = useState(false);
    const hideMintModal = () => setShowMintModal(false);
    const [nativeCurrencyName, setNativeCurrencyName] = useState("");
    const [mintButtonVisible, setMintButtonVisible] = useState(true);

    // Update card function
    const updateCard = async () => {
        await updateUI();
    };

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle SNAKE airdrop button click function
    const handleMintButtonClick = () => {
        // Read native currency name
        setNativeCurrencyName(readNativeCurrencyName(chainId));
        // Show mint modal
        superPetNftClaimFlag == true ? setShowMintModal(true) : setMintButtonVisible(false);
    };

    return (
        <div className="card">
            {/* SuperPet NFT card */}
            <div className="flex justify-between">
                <div className="cardTitle">SuperPet NFT card</div>
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
                {/* SuperPet NFT stats */}
                <div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Snake NFT required:</div>
                        <div className="cardColumn2">{snakeNftRequired.toString()} SPET</div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Max SuperPet NFTs:</div>
                        <div className="cardColumn2">{maxSuperPetNfts.toString()} SPET</div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">SuperPet NFTs minted:</div>
                        <div className="cardColumn2">
                            {superPetNftMinted.toString()} SPET{" "}
                            {Number(maxSuperPetNfts) > 0 &&
                            Number(superPetNftMinted.toString()) >= Number(maxSuperPetNfts.toString()) ? (
                                <span className="text-red-500">(MAX)</span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">SuperPet NFTs balance:</div>
                        <div className="cardColumn2">{superPetNftBalance.toString()} SPET</div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">SuperPet NFT claim:</div>
                        <div className="cardColumn2">{superPetNftClaimFlag.toString().toUpperCase()}</div>
                    </div>
                </div>
                {/* Mint SuperPet NFT button */}
                <div>
                    {mintButtonVisible == true ? (
                        <div className="text-center">
                            <button type="button" className="myButtonLimeMiddle" onClick={handleMintButtonClick}>
                                Mint SuperPet NFT
                            </button>
                        </div>
                    ) : (
                        <div className="error">Not entitled to mint!</div>
                    )}
                </div>
                {/* Mint SuperPet NFT modal */}
                <div>
                    <MintModal
                        isVisible={showMintModal}
                        snakeGameAddress={snakeGameAddress}
                        snakeGameAbi={snakeGameAbi}
                        snakeNftAddress={snakeNftAddress}
                        superPetNftAddress={superPetNftAddress}
                        nftAbi={nftAbi}
                        updateUI={updateUI}
                        snakeNftRequired={snakeNftRequired}
                        superPetNftMintFee={superPetNftMintFee}
                        snakeNftBalance={snakeNftBalance}
                        nativeCurrencyName={nativeCurrencyName}
                        account={account}
                        onClose={hideMintModal}
                    />
                </div>
            </div>
        </div>
    );
}
