import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMoralis } from "react-moralis";
import Head from "next/head";
import PlayerPanel from "../../components/PlayerPanel";

const supportedChainsIds = ["31337", "5"];

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "player"])),
        },
    };
}

export default function Player() {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("player");

    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Player</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="pageTitle">{t("player:title")}</h1>
            </div>
            <div>
                {isWeb3Enabled ? (
                    <div>
                        {supportedChainsIds.includes(chainId.toString()) ? (
                            <PlayerPanel />
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
