import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import { useNotification } from "@web3uikit/core";
import { contractAddresses, snakeGameAbi, tokenAbi } from "../../constants";
import TheSnakeGame from "./TheSnakeGame";
import LoadingSpinner from "../_Helpers_/LoadingSpinner";
import GameFeeInfo from "./GameFeeInfo";

export default function PlayGame({ playGameT }) {
    const { isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();

    const chainId = parseInt(chainIdHex);
    const snakeGameAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeGame"][0] : null;
    const snakeTokenAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeToken"][0] : null;

    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFee, setGameFee] = useState(0);
    const [snakeBalance, setSnakeBalance] = useState(0);
    const [snakeBalanceTooLow, setSnakeBalanceTooLow] = useState(false);

    // UpdateUI
    useEffect(() => {
        if (isWeb3Enabled && snakeGameAddress) {
            updateUI();
        }
    }, [isWeb3Enabled, chainId]);

    const dispatch = useNotification();

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

    // UpdateUI function
    async function updateUI() {
        // Game fee calculation
        const gameFeeFromCall = await gameFeeCalculationFunction(account);
        setGameFee(gameFeeFromCall.toString());
        // SNAKE balance
        const snakeBalanceFromCall = await snakeBalanceFunction(account);
        setSnakeBalance(snakeBalanceFromCall.toString());
        console.log("updateUI");
    }

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle start game button function
    const handleStartGameButton = async () => {
        // Run contract function: getPlayerDataFunction - check game started flag
        const gameStartedFlag = (await getPlayerDataFunction(account))[1];
        if (gameStartedFlag == false) {
            // Run contract function: balanceOf - check SNAKE balance
            const snakeBalanceFromCall = await snakeBalanceFunction(account);
            setSnakeBalance(Number(snakeBalanceFromCall.toString()));
            // Run contract function: gameFeeCalculationFunction - calculate game fee
            const gameFeeFromCall = await gameFeeCalculationFunction(account);
            setGameFee(Number(gameFeeFromCall.toString()));
            if (Number(snakeBalanceFromCall.toString()) >= Number(gameFeeFromCall.toString())) {
                setSnakeBalanceTooLow(false);
                // Turn on loading spinner animation
                setShowLoadingSpinner(true);
                // Run contract function: snakeTokenAllowanceFunction - check SNAKE spend allowance
                const snakeAllowanceFromCall = await snakeTokenAllowanceFunction();
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
                    <div>
                        <div className="startGameButton">
                            {showLoadingSpinner == false ? (
                                <div>
                                    {/* Start game button */}
                                    {snakeBalanceTooLow == false ? (
                                        <button className="myButtonLimeLong" onClick={() => handleStartGameButton()}>
                                            {playGameT.startGameButton}
                                        </button>
                                    ) : (
                                        <div className="error">{playGameT.balanceTooLow}</div>
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
                            <GameFeeInfo playGameT={playGameT} gameFee={gameFee} snakeBalance={snakeBalance} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="snakeGame">
                    <TheSnakeGame />
                </div>
            )}
        </div>
    );
}
