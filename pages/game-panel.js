import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMoralis } from "react-moralis";
import Head from "next/head";
import GamePanel from "../components/GamePanel";

const supportedChainsIds = ["31337", "5"];

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "gamePanel"])),
        },
    };
}

export default function gamePanel({ connectorT, supportedChainIDs }) {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("gamePanel");

    const gamePanelTranslations = {
        inDevelopment: t("gamePanel:GamePanel.in-development"),
    };

    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Game panel</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="pageTitle">{t("gamePanel:title")}</h1>
            </div>
            <div>
                {isWeb3Enabled ? (
                    <div>
                        {supportedChainIDs.includes(chainId.toString()) ? (
                            <div>
                                {/* Page description */}
                                {/* <div className="pageDescriptionTitle">{t("gamePanel:description-header")}</div> */}
                                {/* <div className="pageDescription">
                                    <div>{t("gamePanel:description-text1")}</div>
                                </div> */}
                                {/* NftAwards component */}
                                <GamePanel gamePanelT={gamePanelTranslations} />
                            </div>
                        ) : (
                            <h1 className="connectionProblem">{connectorT.notSupportedChain}</h1>
                        )}
                    </div>
                ) : (
                    <h1 className="connectionProblem">{connectorT.notConnected}</h1>
                )}
            </div>
        </div>
    );
}
