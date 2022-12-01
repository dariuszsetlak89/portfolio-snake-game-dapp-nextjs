import Link from "next/link";
import Image from "next/image";

export default function SnakeNftCard({ updateUI, scoreRequired, maxSnakeNfts, snakeNftMinted, snakeNftBalance }) {
    //////////////////
    // UI Functions //
    //////////////////

    // Update card function
    const updateCard = async () => {
        await updateUI();
    };

    return (
        <div className="card">
            {/* Snake NFT card */}
            <div className="flex justify-between">
                <div className="cardTitle">Snake NFT card</div>
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
                {/* Snake NFT stats */}
                <div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Score required:</div>
                        <div className="cardColumn2">{scoreRequired.toString()} points</div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Max Snake NFTs:</div>
                        <div className="cardColumn2">{maxSnakeNfts.toString()} SNFT</div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Snake NFTs minted:</div>
                        <div className="cardColumn2">
                            {snakeNftMinted.toString()} SNFT{" "}
                            {Number(maxSnakeNfts.toString() > 0) &&
                            Number(snakeNftMinted.toString()) >= Number(maxSnakeNfts.toString()) ? (
                                <span className="text-red-500">(MAX)</span>
                            ) : (
                                ""
                            )}{" "}
                        </div>
                    </div>
                    <div className="cardColumns">
                        <div className="cardColumn1">Snake NFTs balance:</div>
                        <div className="cardColumn2">{snakeNftBalance.toString()} SNFT</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
