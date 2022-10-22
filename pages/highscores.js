import Head from "next/head";

export default function HighScores() {
    return (
        <div>
            <Head>
                <title>Snake Game Dapp | High scores</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="text-5xl font-bold text-lime-600 text-center pr-10 pt-5">
                    HIGH SCORES
                </h1>
            </div>
        </div>
    );
}
