import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";

import Layout from "../components/Layout";

import "../styles/globals.css";

function SnakeGameDapp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default SnakeGameDapp;
