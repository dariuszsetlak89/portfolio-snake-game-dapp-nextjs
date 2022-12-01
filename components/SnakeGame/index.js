import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import { useNotification } from "@web3uikit/core";
import { contractAddresses, snakeGameAbi, tokenAbi } from "../../constants";
import TheSnakeGame from "./TheSnakeGame";
import LoadingSpinner from "../Animations/LoadingSpinner";
import GameFeeInfo from "./GameFeeInfo";

export default function SnakeGame() {
    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();

    /////////////////////////////
    // Read contract addresses //
    /////////////////////////////
    const chainId = parseInt(chainIdHex);
    const snakeGameAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeGame"][0] : null;
    const snakeTokenAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeToken"][0] : null;

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFee, setGameFee] = useState(0);
    const [snakeBalance, setSnakeBalance] = useState(0);
    const [snakeBalanceTooLow, setSnakeBalanceTooLow] = useState(false);

    /////////////////////
    // useEffect Hooks //
    /////////////////////

    // UpdateUI
    useEffect(() => {
        if (isWeb3Enabled && snakeGameAddress) {
            updateUI();
        }
    }, [isWeb3Enabled, chainId]);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: getPlayerDataFunction
    const { runContractFunction: getPlayerDataFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "getPlayerData",
        params: {
            _player: account,
        },
    });

    // Contract function: gameFeeCalculationFunction
    const { runContractFunction: gameFeeCalculationFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "gameFeeCalculation",
        params: {
            _player: account,
        },
    });

    // Contract function: snakeBalanceFunction
    const { runContractFunction: snakeBalanceFunction } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: snakeTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    });

    // Contract function: snakeTokenAllowanceFunction
    const { runContractFunction: snakeTokenAllowanceFunction } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: snakeTokenAddress,
        functionName: "allowance",
        params: {
            owner: account,
            spender: snakeGameAddress,
        },
    });

    // Contract function: snakeTokenApproveFunction
    const { runContractFunction: snakeTokenApproveFunction } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: snakeTokenAddress,
        functionName: "approve",
        params: {
            spender: snakeGameAddress,
            amount: 12,
        },
    });

    // Contract function: gameStart
    const { runContractFunction: gameStart } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "gameStart",
        params: {},
    });

    //////////////////
    // UI Functions //
    //////////////////

    // UpdateUI function
    async function updateUI() {
        // Game fee calculation
        const gameFeeFromCall = await gameFeeCalculationFunction(account);
        // console.log("Game fee from call:", gameFeeFromCall.toString());
        setGameFee(gameFeeFromCall.toString());
        // SNAKE balance
        const snakeBalanceFromCall = await snakeBalanceFunction(account);
        // console.log(`SNAKE balance from call: ${snakeBalanceFromCall.toString()}`);
        setSnakeBalance(snakeBalanceFromCall.toString());
        //
        console.log("updateUI");
    }

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle start game button function
    const handleStartGameButton = async () => {
        // Run contract function: getPlayerDataFunction - check game started flag
        const gameStartedFlag = (await getPlayerDataFunction(account))[1];
        // console.log("gameStartedFlag:", gameStartedFlag);
        if (gameStartedFlag == false) {
            // Run contract function: balanceOf - check SNAKE balance
            const snakeBalanceFromCall = await snakeBalanceFunction(account);
            setSnakeBalance(Number(snakeBalanceFromCall.toString()));
            // console.log("snakeBalance from call:", snakeBalanceFromCall.toString());
            // console.log("snakeBalance from state:", snakeBalance.toString());
            // Run contract function: gameFeeCalculationFunction - calculate game fee
            const gameFeeFromCall = await gameFeeCalculationFunction(account);
            setGameFee(Number(gameFeeFromCall.toString()));
            // console.log("gameFee from call:", gameFeeFromCall.toString());
            // console.log("gameFee from state:", gameFee.toString());
            if (Number(snakeBalanceFromCall.toString()) >= Number(gameFeeFromCall.toString())) {
                setSnakeBalanceTooLow(false);
                // Turn on loading spinner animation
                setShowLoadingSpinner(true);
                // Run contract function: snakeTokenAllowanceFunction - check SNAKE spend allowance
                const snakeAllowanceFromCall = await snakeTokenAllowanceFunction();
                // console.log("snakeAllowance:", snakeAllowanceFromCall.toString());
                if (snakeAllowanceFromCall < gameFeeFromCall) {
                    handleSnakeTokenApproval();
                } else {
                    handleGameStart();
                }
            } else {
                // Turn off loading spinner animation
                setShowLoadingSpinner(false);
                // Error: SNAKE balance too low!
                setSnakeBalanceTooLow(true);
                // console.log("SNAKE balance too low!");
                // console.log("snakeBalanceTooLow:", snakeBalanceTooLow);
            }
            // };
        } else {
            setGameStarted(true);
        }
    };

    // Handle SNAKE tokens approval function
    const handleSnakeTokenApproval = async () => {
        // Run contract function: snakeTokenApproveFunction
        await snakeTokenApproveFunction({
            onError: (error) => console.log(error),
            onSuccess: handleGameStart,
        });
    };

    // Handle game start function
    const handleGameStart = async () => {
        // Run contract function: gameStart
        await gameStart({
            onError: (error) => console.log(error),
            onSuccess: handleGameStartSuccess,
        });
    };

    // Handle game start success function
    const handleGameStartSuccess = async (tx) => {
        await tx.wait(1);
        // Game started notification
        dispatch({
            type: "success",
            message: "Snake Game started!",
            title: "Snake Game started",
            position: "bottomL",
        });
        // Start the game
        setGameStarted(true);
        // Turn off loading spinner animation
        setShowLoadingSpinner(false);
    };

    return (
        <div>
            {gameStarted == false ? (
                <div className="pageContent">
                    <div className="m-2">
                        Want to test the Game before real play? Claim free SNAKE tokens airdrop and play 3 test games!
                    </div>
                    <div className="m-2">
                        Want to compete with other players? Simply buy SNAKE tokens and start the game to get the
                        highest score!
                    </div>
                    <div>
                        <div className="h-40 flex justify-center items-center">
                            {showLoadingSpinner == false ? (
                                <div>
                                    {/* Start game button */}
                                    {snakeBalanceTooLow == false ? (
                                        <button className="myButtonLime" onClick={() => handleStartGameButton()}>
                                            START GAME
                                        </button>
                                    ) : (
                                        <div className="error">SNAKE balance too low!</div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {/* Loading spinner animation */}
                                    <LoadingSpinner />
                                </div>
                            )}
                        </div>
                        <div>
                            {/* Game fee info */}
                            <GameFeeInfo gameFee={gameFee} snakeBalance={snakeBalance} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="theSnakeGame">
                    <TheSnakeGame />
                </div>
            )}
        </div>
    );
}
