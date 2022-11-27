import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "howtoplay"])),
        },
    };
}

export default function Home(props) {
    const { t } = useTranslation("howtoplay");

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
                <h1 className="pageTitle">{t("howtoplay:title")}</h1>
                <div className="p-10 text-2xl font-mono">
                    <p className="font-bold text-3xl">Jak grać?</p>
                    <p>1. Jeśli jesteś nowym graczem, odbierz darmowy airdrop tokenów SNAKE.</p>
                    <p>2. Kup kredyty za tokeny SNAKE, aby zagrać w grę.</p>
                    <p>3. Zagraj w grę Snake, płacąc za grę odpowiednią ilością kredytów.</p>
                    <p>4. Podczas gry zbierz jak najwięcej owoców, za które otrzymasz tokeny FRUIT.</p>
                    <p>5. Zbierz minimum 100 owoców podczas jednej gry i odbierz Snake NFT.</p>
                    <p>6. Zbierz kolekcję 10 Snake NFTs i wymień je na unikalny token Super Pet NFT.</p>
                    <p>
                        7. Rywalizuj z innymi graczami, aby zdobyć jak najwyższy wynik i zapisać się w tablicy
                        najlepszych wyników.
                    </p>
                </div>
            </div>
        </div>
    );
}
