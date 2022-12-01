import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMoralis } from "react-moralis";
import Head from "next/head";
import SnakeGame from "../../components/SnakeGame";

const supportedChainsIds = ["31337", "5"];

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "game"])),
        },
    };
}

export default function snakegame() {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("game");

    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Game</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="pageTitle">{t("game:title")}</h1>
            </div>
            <div>
                {isWeb3Enabled ? (
                    <div>
                        {supportedChainsIds.includes(chainId.toString()) ? (
                            <SnakeGame />
                        ) : (
                            <h1 className="connectionProblem">Not supported chain!</h1>
                        )}
                    </div>
                ) : (
                    <h1 className="connectionProblem">Web3 wallet not connected!</h1>
                )}
            </div>
        </div>
    );
}
