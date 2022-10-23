import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import Background from "../components/Background";

const supportedChains = ["31337", "4", "5"];

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis();
    return (
        <div className={styles.container}>
            {/* <Head>
                <title>Snake Game Dapp</title>
                <meta name="description" content="Snake Game Dapp" />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            {/* <Background /> */}
            <div class={styles.background}>
                <Image src="/test.png" alt="Test" layout="fill" objectFit="cover" />
            </div>

            <h1
                style={{
                    paddingTop: "30vh",
                    fontFamily: "monospace",
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Next.js Background Image Tutorial
            </h1>
            <Header />
            {isWeb3Enabled ? (
                <div>
                    {supportedChains.includes(parseInt(chainId).toString()) ? (
                        <div className="flex flex-row"></div>
                    ) : (
                        <div>
                            <p>{`Please switch to a supported chain.`}</p>
                            <p>{`The supported chain ids are: ${supportedChains}`}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please connect to a Wallet!</div>
            )}
        </div>
    );
}


<div className="mx-8 mt-12 p-3 w-48 flex justify-center bg-lime-300">
            <div className={language === "pl" ? " border-lime-500 border-2" : ""}>
                <div className="px-1 pt-1 flex-none">
                    <Image src="/flags/polish-flag.png" alt="Polish flag" width={64} height={64} />
                </div>
            </div>

            <div className={language === "en" ? " border-lime-500 border-2" : ""}>
                <div className="px-1 pt-1 flex-none">
                    <Image
                        src="/flags/british-flag.png"
                        alt="British flag"
                        width={64}
                        height={64}
                    />
                </div>
            </div>
        </div>