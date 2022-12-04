import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMoralis } from "react-moralis";
import Head from "next/head";
import PlayerPanel from "../components/PlayerPanel";

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "playerPanel"])),
        },
    };
}

export default function playerPanel({ connectorT, supportedChainIDs }) {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("playerPanel");

    const playerPanelTranslations = {
        test: t("PlayerPanel:test-message"),
    };

    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);

    return (
        <div>
            {/* Head */}
            <Head>
                <title>Snake Game Dapp | Player panel</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            {/* Content */}
            <div>
                {/* Page title */}
                <h1 className="pageTitle">{t("playerPanel:title")}</h1>
                <div>
                    {isWeb3Enabled ? (
                        <div>
                            {supportedChainIDs.includes(chainId.toString()) ? (
                                <div>
                                    {/* Page description */}
                                    <div className="pageDescriptionTitle">{t("playerPanel:description-header")}</div>
                                    <div className="pageDescription">
                                        <div>{t("playerPanel:description-text1")}</div>
                                        <div>{t("playerPanel:description-text2")}</div>
                                        <div>{t("playerPanel:description-text3")}</div>
                                        <div>{t("playerPanel:description-text4")}</div>
                                    </div>
                                    {/* PlayerPanel component */}
                                    <PlayerPanel playerPanelT={playerPanelTranslations} />
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
        </div>
    );
}
