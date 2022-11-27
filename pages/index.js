import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "home"])),
        },
    };
}

export default function Home(props) {
    const { t } = useTranslation();

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
