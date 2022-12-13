import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMoralis } from "react-moralis";
import Head from "next/head";
import NftAwards from "../components/NftAwards";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "nftAwards"])),
        },
    };
}

export default function nftAwards({ connectorT, supportedChainIDs }) {
    const { t } = useTranslation("nftAwards");

    const nftAwardsTranslations = {
        nftMarketplaceButton: t("nftAwards:NftAwards.nft-marketplace-button"),
        inDevelopment: t("nftAwards:NftAwards.in-development"),
    };

    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);

    return (
        <div>
            {/* Head */}
            <Head>
                <title>Snake Game Dapp | NFT awards</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                {/* Page title */}
                <h1 className="pageTitle">{t("nftAwards:title")}</h1>
                <div>
                    {isWeb3Enabled ? (
                        <div>
                            {supportedChainIDs.includes(chainId.toString()) ? (
                                <div>
                                    {/* Page description */}
                                    {/* <div className="pageDescriptionTitle">{t("nftAwards:description-header")}</div> */}
                                    {/* <div className="pageDescription">
                                        <div>{t("nftAwards:description-text1")}</div>
                                    </div> */}
                                    {/* NftAwards component */}
                                    <NftAwards nftAwardsT={nftAwardsTranslations} />
                                </div>
                            ) : (
                                <h1 className="connectionProblem">{connectorT.notSupportedChain}</h1>
                            )}
                        </div>
                    ) : (
                        <h1 className="connectionProblem">{connectorT.notConnected}</h1>
                    )}
                </div>
            </div>
        </div>
    );
}
