import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouterScroll } from "@moxy/next-router-scroll";
import Head from "next/head";
import Home from "../components/Home";

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "home"])),
        },
    };
}

export default function HomePage() {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("home");

    const homeTranslations = {
        howToPlayButton: t("home:howToPlay-button"),
    };

    ///////////////////
    // Scroll update //
    ///////////////////
    const { updateScroll } = useRouterScroll();

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        updateScroll();
    }, []);

    return (
        <div>
            {/* Head */}
            <Head>
                <title>Snake Game Dapp | Home</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            {/* Content */}
            <div>
                {/* Page title */}
                <h1 className="pageTitle">{t("home:title")}</h1>
                {/* Page description */}
                <div className="pageDescriptionTitle">{t("home:description-header")}</div>
                <div>
                    <div className="pageDescription">{t("home:description-text1")}</div>
                    <div className="pageDescription">{t("home:description-text2")}</div>
                    <div className="pageDescription">{t("home:description-text3")}</div>
                </div>
                <div className="pageDescriptionTitle">{t("home:howToPlay-header")}</div>
                <div className="pageDescription">
                    <div>{t("home:howToPlay-point1")}</div>
                    <div>{t("home:howToPlay-point2")}</div>
                    <div>{t("home:howToPlay-point3")}</div>
                    <div>{t("home:howToPlay-point4")}</div>
                </div>
                <div>{/* <div className="pageContent">{t("home:detailed-rules")}</div> */}</div>
                {/* Home component */}
                <Home homeT={homeTranslations} />
            </div>
        </div>
    );
}
