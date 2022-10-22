import Head from "next/head";
import Navbar from "../components/Layout/Navbar";

export default function Home() {
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
                <h1 className="text-5xl font-bold text-lime-600 text-center pr-10 pt-5">HOME</h1>
            </div>
        </div>
    );
}
