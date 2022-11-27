import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "highscores"])),
        },
    };
}

export default function HighScores() {
    const { t } = useTranslation("highscores");

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | High scores</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="pageTitle">{t("highscores:title")}</h1>
            </div>
        </div>
    );
}
