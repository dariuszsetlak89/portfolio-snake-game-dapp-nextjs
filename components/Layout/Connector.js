import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";

const supportedChainsIds = ["31337", "5"];

export default function Header({ connectorTranslations, supportedChains }) {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <div>
            <div className="connectorButton">
                <ConnectButton moralisAuth={false} />
            </div>
            <div>
                {isWeb3Enabled ? (
                    <div>
                        {supportedChainsIds.includes(parseInt(chainId).toString()) ? (
                            <div>
                                <div className="connectorConnected">
                                    <p>{connectorTranslations.connected}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="connectorNotSupportedChain">
                                    <p className="text-2xl font-bold">{connectorTranslations.notSupportedChain}</p>
                                    <p className="text-xl">{`${connectorTranslations.supportedChains} ${connectorTranslations.supportedChainsIds}`}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="connectorPleaseConnect">
                        <p>{connectorTranslations.pleaseConnect}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
