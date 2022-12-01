import { useState } from "react";
import Image from "next/image";
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
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showMintModal, setShowMintModal] = useState(false);
    const hideMintModal = () => setShowMintModal(false);
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
    const handleMintButtonClick = () => {
        // Read native currency name
        readNativeCurrencyName(chainId);
        // Show mint modal
        superPetNftClaimFlag == true ? setShowMintModal(true) : "";
        // console.log("Show mint modal!");
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
            {/* SuperPet NFT card */}
            <div className="flex justify-between">
                <div className="cardTitle">SuperPet NFT card</div>
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
                {/* SuperPet NFT stats */}
                <div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Snake NFT required:</div>
                        <div className="cardColumn2">{snakeNftRequired.toString()} SPET</div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">SuperPet NFT claim:</div>
                        <div className="cardColumn2">{superPetNftClaimFlag.toString().toUpperCase()}</div>
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
                </div>
                {/* Mint SuperPet NFT button */}
                <div>
                    {superPetNftClaimFlag == true ? (
                        <div className="text-center">
                            <button type="button" className="myButtonLimeMiddle" onClick={handleMintButtonClick}>
                                Mint SuperPet NFT
                            </button>
                        </div>
                    ) : (
                        ""
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
