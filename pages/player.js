import Head from "next/head";

export default function Player() {
    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Player</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="text-5xl font-bold text-lime-600 text-center pr-10 pt-5">
                    PLAYER PANEL
                </h1>
            </div>
        </div>
    );
}
