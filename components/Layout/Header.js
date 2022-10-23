import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";
import Image from "next/image";

const supportedChainsIds = ["31337", "4", "5"];

export default function Header({ connected, pleaseConnect, notSupportedChain, supportedChains }) {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <header>
            <div className="border-box flex flex-row">
                <div className="basis-1/6 m-5 p-5 text-center flex-none">
                    <Image
                        src="/images/snake-no-bg.png"
                        alt="Snake logo"
                        width={125}
                        height={120}
                    />
                </div>
                <div className="m-auto basis-3/6 text-center flex-none">
                    <Image
                        src="/images/snake-game-dapp.png"
                        alt="Snake wordart"
                        width={800}
                        height={125}
                    />
                </div>
                <div className="my-auto px-2 basis-1/6 flex-none">
                    <div>
                        <ConnectButton moralisAuth={false} className="justify-center" />
                    </div>
                    <div>
                        {isWeb3Enabled ? (
                            <div>
                                {supportedChainsIds.includes(parseInt(chainId).toString()) ? (
                                    <div className="p-2 text-2xl text-center text-green-600 font-medium">
                                        <p>{connected}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-2xl text-center text-red-600 font-medium">
                                            <p>{notSupportedChain}</p>
                                            <p>{`${supportedChains} ${supportedChainsIds}`}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-2xl text-center text-red-600 font-medium">
                                <p>{pleaseConnect}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
