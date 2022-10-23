import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
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
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Layout
                    connected={t("header.connected")}
                    pleaseConnect={t("header.please-connect")}
                    notSupportedChain={t("header.not-supported-chain")}
                    supportedChains={t("header.supported-chains")}
                    homeButton={t("navbar.home-button")}
                    howToPlayButton={t("navbar.how-to-play-button")}
                    playerPanelButton={t("navbar.player-panel-button")}
                    playGameButton={t("navbar.play-game-button")}
                    awardButton={t("navbar.awards-button")}
                    highScoresButton={t("navbar.high-scores-button")}
                    contactButton={t("navbar.contact-button")}
                >
                    <Component {...pageProps} />
                </Layout>
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default appWithTranslation(SnakeGameDapp);
