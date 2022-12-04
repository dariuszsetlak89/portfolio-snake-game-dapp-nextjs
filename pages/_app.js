import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { RouterScrollProvider } from "@moxy/next-router-scroll";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

function SnakeGameDapp({ Component, pageProps }) {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("common");

    const connectorTranslations = {
        connected: t("connector.connected"),
        pleaseConnect: t("connector.please-connect"),
        notSupportedChain: t("connector.not-supported-chain"),
        supportedChains: t("connector.supported-chains"),
        notConnected: t("connector.wallet-not-connected"),
    };

    const sideNavbarTranslations = {
        homeButton: t("sideNavbar.home-button"),
        playerPanelButton: t("sideNavbar.player-panel-button"),
        nftAwardsButton: t("sideNavbar.nft-awards-button"),
        playGameButton: t("sideNavbar.play-game-button"),
        gamePanelButton: t("sideNavbar.game-panel-button"),
    };

    //////////////////////
    // Supported chains //
    //////////////////////
    const supportedChainIDs = ["31337", "5", "80001"];
    // const supportedChains = [
    //     { chainID: "31337", name: "Hardhat", currency: "HH ETH" },
    //     { chainID: "5", name: "Goerli", currency: "Goerli ETH" },
    //     { chainID: "80001", name: "Mumbai", currency: "Mumbai MATIC" },
    // ];

    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                {/* Head */}
                <Head>
                    <title>Snake Game Dapp</title>
                    <meta
                        name="description"
                        content="The classic Snake Game with modern Web3 blockchain functionalities.
                        Score game points to gain FRUIT tokens and unique, cute Super Pet NFT!"
                    />
                    <link rel="icon" href="/snake-icon.ico" />
                </Head>
                {/* Content */}
                <RouterScrollProvider>
                    <Layout
                        connectorT={connectorTranslations}
                        sideNavbarT={sideNavbarTranslations}
                        supportedChainIDs={supportedChainIDs}
                    >
                        <Component
                            {...pageProps}
                            connectorT={connectorTranslations}
                            supportedChainIDs={supportedChainIDs}
                        />
                    </Layout>
                </RouterScrollProvider>
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default appWithTranslation(SnakeGameDapp);
