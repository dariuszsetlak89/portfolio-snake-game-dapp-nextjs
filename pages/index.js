import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouterScroll } from "@moxy/next-router-scroll";
import Head from "next/head";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "home"])),
        },
    };
}

export default function Home(props) {
    const { t } = useTranslation();
    const { updateScroll } = useRouterScroll();

    useEffect(() => {
        updateScroll();
    }, []);

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Home</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="pageTitle">{t("home:title")}</h1>
            </div>
        </div>
    );
}
