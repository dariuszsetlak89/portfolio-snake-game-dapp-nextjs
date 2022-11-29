import { useNotification } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { contractAddresses, snakeGameAbi, tokenAbi } from "../../constants";
import Head from "next/head";
import SnakeGame from "../../components/SnakeGame";
// import { ethers } from "ethers";
import LoadingSpinner from "../../components/Animations/LoadingSpinner";

//////////////////////////////
// Server Side Translations //
//////////////////////////////
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "game"])),
        },
    };
}

export default function Game() {
    ////////////////////
    //  Translations  //
    ////////////////////
    const { t } = useTranslation("game");

    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis();

    /////////////////////////////
    // Read contract addresses //
    /////////////////////////////
    const chainId = parseInt(chainIdHex);
    const snakeGameAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeGame"][0] : null;
    const snakeTokenAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeToken"][0] : null;

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [isLoading, setIsLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: getPlayerData
    const { runContractFunction: getPlayerData } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "getPlayerData",
        params: {
            _player: account,
        },
    });

    // Contract function: allowance
    const { runContractFunction: allowance } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: snakeTokenAddress,
        functionName: "allowance",
        params: {
            owner: account,
            spender: snakeGameAddress,
        },
    });

    // Contract function: approve
    const { runContractFunction: approve } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: snakeTokenAddress,
        functionName: "approve",
        params: {
            spender: snakeGameAddress,
            amount: 10,
        },
    });

    // Contract function: gameStart
    const { runContractFunction: gameStart } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "gameStart",
        params: {},
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // CHECK IF GAME IS STARTED FUNCTION

    // Handle start game button function
    const handleStartGameButton = async () => {
        setIsLoading(true);
        const gameStartedFlag = (await getPlayerData(account))[1];
        console.log("gameStartedFlag:", gameStartedFlag);
        if (gameStartedFlag == false) {
            ///// ADD FUNCTION TO CHECK SNAKE BALANCE
            ///// ADD FUNCTION TO CALCULATE GAME FEE HERE !!!
            const gameFee = 4;
            console.log("gameFee", gameFee);
            const snakeAllowance = await allowance();
            console.log("snakeAllowance:", snakeAllowance.toString());
            if (snakeAllowance < gameFee) {
                handleApproval();
            } else {
                handleGameStart();
            }
        } else {
            setGameStarted(true);
        }
    };

    // Handle approval function
    const handleApproval = async () => {
        await approve({
            onError: (error) => console.log(error),
            onSuccess: handleGameStart,
        });
    };

    // Handle game start function
    const handleGameStart = async () => {
        await gameStart({
            onError: (error) => console.log(error),
            onSuccess: handleGameStartSuccess,
        });
    };

    // Handle game start success function
    const handleGameStartSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "Snake Game started!",
            title: "Snake Game started",
            position: "bottomL",
        });
        setGameStarted(true);
        setIsLoading(false);
    };

    return (
        <div>
            <Head>
                <title>Snake Game Dapp | Game</title>
                <link rel="icon" href="/snake-icon.ico" />
            </Head>
            <div>
                <h1 className="pageTitle">{t("game:title")}</h1>
                <div className="startGameButton">
                    {gameStarted == false ? (
                        isLoading == false ? (
                            // Buy button
                            <button className="myButtonLime" onClick={handleStartGameButton}>
                                START GAME
                            </button>
                        ) : (
                            // Loading spinner animation
                            <LoadingSpinner />
                        )
                    ) : (
                        <div className="snakeGame">
                            <SnakeGame />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
