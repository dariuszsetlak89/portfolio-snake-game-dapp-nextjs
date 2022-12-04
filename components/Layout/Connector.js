import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";

export default function Header({ connectorT, supportedChainIDs }) {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <div>
            <div className="connectorButton">
                <ConnectButton moralisAuth={false} />
            </div>
            <div>
                {isWeb3Enabled ? (
                    <div>
                        {supportedChainIDs.includes(parseInt(chainId).toString()) ? (
                            <div>
                                <div className="connectorConnected">
                                    <p>{connectorT.connected}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="connectorNotSupportedChain">
                                    <p className="text-2xl font-bold">{connectorT.notSupportedChain}</p>
                                    <p className="text-xl">{`${connectorT.supportedChains} ${supportedChainIDs}`}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="connectorPleaseConnect">
                        <p>{connectorT.pleaseConnect}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
