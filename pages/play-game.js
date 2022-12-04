import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMoralis } from "react-moralis";
import Head from "next/head";
import PlayGame from "../components/PlayGame";

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "playGame"])),
        },
    };
}

export default function playGame({ connectorT, supportedChainIDs }) {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("playGame");

    const playGameTranslations = {
        startGameButton: t("playGame:PlayGame.start-game-button"),
        balanceTooLow: t("playGame:PlayGame.balance-too-low"),
        gameFee: t("playGame:GameFeeInfo.game-fee"),
        snakeBalance: t("playGame:GameFeeInfo.snake-balance"),
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
                <title>Snake Game Dapp | Play game</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            {/* Content */}
            <div>
                {/* Page title */}
                <h1 className="pageTitle">{t("playGame:title")}</h1>
                <div>
                    {isWeb3Enabled ? (
                        <div>
                            {supportedChainIDs.includes(chainId.toString()) ? (
                                <div>
                                    {/* Page description */}
                                    <div className="pageDescriptionTitle">{t("playGame:description-header")}</div>
                                    <div className="pageDescription">{t("playGame:description-text1")}</div>
                                    <div className="pageDescription">{t("playGame:description-text2")}</div>
                                    {/* SnakeGame component */}
                                    <PlayGame playGameT={playGameTranslations} />
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
