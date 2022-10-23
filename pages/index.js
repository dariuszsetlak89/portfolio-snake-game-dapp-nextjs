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
                <meta
                    name="description"
                    content="The classic Snake Game with modern Web3 blockchain functionalities.
                    Score game points to gain FRUIT tokens and unique, cute Super Pet NFT!"
                />
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="text-5xl font-bold text-lime-600 text-center m-auto">
                    {t("home:title")}
                </h1>
            </div>
        </div>
    );
}
