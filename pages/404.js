import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "404"])),
        },
    };
}

export default function NotFound() {
    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            // router.go(-1)
            router.push("/");
        }, 5000);
    }, []);

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Error 404</title>
                <meta name="description" content="Snake Game Dapp - Error 404" />
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div className="pt-24 text-center text-lime-600">
                <h1 className="p-5 text-6xl font-semibold">{t("404:oops")}</h1>
                <h2 className="p-2 text-4xl font-medium">{t("404:not-found")} :(</h2>
                <p className="p-2 text-4xl font-medium">
                    {t("404:go-back")}{" "}
                    <Link href="/">
                        <div className="underline">{t("404:home-page")}</div>
                    </Link>{" "}
                    {t("404:time")}
                </p>
            </div>
        </div>
    );
}
