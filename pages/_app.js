import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { RouterScrollProvider } from "@moxy/next-router-scroll";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

function SnakeGameDapp({ Component, pageProps }) {
    const { t } = useTranslation("common");

    const commonTranslations = {
        connected: t("header.connected"),
        pleaseConnect: t("header.please-connect"),
        notSupportedChain: t("header.not-supported-chain"),
        supportedChains: t("header.supported-chains"),
        howToPlayButton: t("topNavbar.how-to-play-button"),
        homeButton: t("sideNavbar.home-button"),
        playerPanelButton: t("sideNavbar.player-panel-button"),
        playGameButton: t("sideNavbar.play-game-button"),
        awardButton: t("sideNavbar.awards-button"),
        highScoresButton: t("sideNavbar.high-scores-button"),
    };

    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Head>
                    <title>Snake Game Dapp</title>
                    <meta
                        name="description"
                        content="The classic Snake Game with modern Web3 blockchain functionalities.
                        Score game points to gain FRUIT tokens and unique, cute Super Pet NFT!"
                    />
                    <link rel="icon" href="/snake-icon.ico" />
                </Head>
                <RouterScrollProvider>
                    <Layout translations={commonTranslations}>
                        <Component {...pageProps} />
                    </Layout>
                </RouterScrollProvider>
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default appWithTranslation(SnakeGameDapp);
