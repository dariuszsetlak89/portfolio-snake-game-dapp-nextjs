import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";
import Image from "next/image";

const supportedChains = ["31337", "4", "5"];

export default function Header() {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <header>
            <div className="p-5 flex justify-around">
                <div className="flex-shrink">
                    <Image src="/snake-no-bg.png" alt="Snake logo" width={125} height={125} />
                </div>
                <div className="flex-shrink align-center">
                    <Image
                        src="/snake-game-dapp.png"
                        alt="Snake wordart"
                        width={800}
                        height={125}
                    />
                </div>
                <div className="flex-none grid content-evenly">
                    <div>
                        <ConnectButton moralisAuth={false} className="justify-center" />
                    </div>
                    <div>
                        {isWeb3Enabled ? (
                            <div>
                                {supportedChains.includes(parseInt(chainId).toString()) ? (
                                    <div className="text-2xl text-center text-green-600 font-medium">
                                        <p>Connected!</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-2xl text-center text-red-600 font-medium">
                                            <p>{`Not supported chain!`}</p>
                                            <p>{`Supported chains id: ${supportedChains}`}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-2xl text-center text-red-600 font-medium">
                                <p>Please connect to a Wallet!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
