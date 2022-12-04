import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import { contractAddresses, snakeGameAbi, tokenAbi, nftAbi } from "../../constants";
import CurrentRoundCard from "./CurrentRoundCard";
import GlobalStatsCard from "./GlobalStatsCard";

export default function GamePanel({ gamePanelT }) {
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
    const snakeNftAddress = chainId in contractAddresses ? contractAddresses[chainId]["SnakeNft"][0] : null;
    const superPetNftAddress = chainId in contractAddresses ? contractAddresses[chainId]["SuperPetNft"][0] : null;

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [snakeAirdropFlag, setSnakeAirdropFlag] = useState(false);

    const [currentRound, setCurrentRound] = useState(0);
    const [roundGamesPlayed, setRoundGamesPlayed] = useState(0);
    const [roundHighestScore, setRoundHighestScore] = useState(0);
    const [roundBestPlayer, setRoundBestPlayer] = useState(0);
    const [gamePoolBalance, setGamePoolBalance] = useState(0);
    const [roundStart, setRoundStart] = useState(0);
    const [roundEnd, setRoundEnd] = useState(0);
    const [roundDuration, setRoundDuration] = useState(0);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [gamesPlayedTotal, setGamesPlayedTotal] = useState(0);
    const [highestScoreEver, setHighestScoreEver] = useState(0);
    const [bestPlayerEver, setBestPlayerEver] = useState(0);
    const [snakeTokenSupply, setSnakeTokenSupply] = useState(0);
    const [snakeNftMintedTotal, setSnakeNftMintedTotal] = useState(0);
    const [superPetNftMintedTotal, setSuperPetNftMintedTotal] = useState(0);

    /////////////////////
    // useEffect Hooks //
    /////////////////////

    // UpdateUI
    useEffect(() => {
        if (isWeb3Enabled && snakeGameAddress) {
            updateUI();
        }
    }, [isWeb3Enabled, chainId]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: getGameRound
    const { runContractFunction: getGameRound } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "getGameRound",
        params: {},
    });

    // Contract function: getGameRoundData
    const { runContractFunction: getGameRoundData } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "getGameRoundData",
        params: {
            _gameRound: currentRound,
        },
    });

    // RoundStart
    // RoundEnd
    // Duration

    // Contract function: getPlayersNumberTotal - total number of players
    const { runContractFunction: getPlayersNumberTotal } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "getPlayersNumberTotal",
        params: {},
    });

    ////////////////////////////////////////////////////////////////////////////////

    // Contract function: snakeBalanceFunction
    const { runContractFunction: snakeBalanceFunction } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: snakeTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    });

    // Contract function: snakeNftBalanceFunction
    const { runContractFunction: snakeNftBalanceFunction } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: snakeNftAddress,
        functionName: "balanceOf",
        params: {
            owner: account,
        },
    });

    // Contract function: superPetNftBalanceFunction
    const { runContractFunction: superPetNftBalanceFunction } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: superPetNftAddress,
        functionName: "balanceOf",
        params: {
            owner: account,
        },
    });

    //////////////////
    // UI Functions //
    //////////////////

    // UpdateUI function
    async function updateUI() {
        // Get player data
        const playerData = await getPlayerDataFunction();
        // SNAKE airdrop flag
        const snakeAirdropFlagFromCall = playerData[0];
        setSnakeAirdropFlag(snakeAirdropFlagFromCall);
        // Game started flag
        const gameStartedFlagFromCall = playerData[1];
        setGameStartedFlag(gameStartedFlagFromCall);
        // SuperPet NFT claim flag
        const superPetNftClaimFlagFromCall = playerData[2];
        setSuperPetNftClaimFlag(superPetNftClaimFlagFromCall);
        // Games played
        const gamesPlayedFromCall = playerData[3].toString();
        setGamesPlayed(gamesPlayedFromCall);
        // Last score
        const lastScoreFromCall = playerData[4].toString();
        setLastScore(lastScoreFromCall);
        // Best score
        const bestScoreFromCall = playerData[5].toString();
        setBestScore(bestScoreFromCall);
        // Snake NFT minted
        const snakeNftMintedFromCall = playerData[6].toString();
        setSnakeNftMinted(snakeNftMintedFromCall.toString());
        // Super Pet NFT minted
        const superPetNftMintedFromCall = playerData[7].toString();
        setSuperPetNftMinted(superPetNftMintedFromCall.toString());
        // Score required to mint Snake NFT
        const scoreRequiredFromCall = await scoreRequiredFunction(account);
        setScoreRequired(scoreRequiredFromCall.toString());
        // Snake NFT amount required to mint SuperPet NFT
        const snakeNftRequiredFromCall = await snakeNftRequiredFunction(account);
        setSnakeNftRequired(snakeNftRequiredFromCall.toString());
        // SNAKE tokens exchange rate
        const snakeExchangeRate = await snakeExchangeRateFunction();
        setSnakeExchangeRate(snakeExchangeRate.toString());
        // SuperPet NFT mint fee
        const superPetNftMintFeeFromCall = await superPetNftMintFeeFunction();
        setSuperPetNftMintFee(superPetNftMintFeeFromCall.toString());
        // SNAKE tokens airdrop amount
        const snakeAirdropAmount = await snakeAirdropAmountFunction();
        setSnakeAirdropAmount(snakeAirdropAmount.toString());
        // Max Snake NFTs
        const maxSnakeNftsFromCall = await maxSnakeNftsFunction(account);
        setMaxSnakeNfts(maxSnakeNftsFromCall.toString());
        // Max Super Pet NFTs
        const maxSuperPetNftsFromCall = await maxSuperPetNftsFunction(account);
        setMaxSuperPetNfts(maxSuperPetNftsFromCall.toString());
        // Game fee calculation
        const gameFeeFromCall = await gameFeeCalculation(account);
        setGameFee(gameFeeFromCall.toString());
        // SNAKE balance
        const snakeBalanceFromCall = await snakeBalanceFunction(account);
        setSnakeBalance(snakeBalanceFromCall.toString());
        // Snake NFT balance
        const snakeNftBalanceFromCall = await snakeNftBalanceFunction(account);
        setSnakeNftBalance(snakeNftBalanceFromCall.toString());
        // Super Pet NFT balance
        const superPetNftBalanceFromCall = await superPetNftBalanceFunction(account);
        setSuperPetNftBalance(superPetNftBalanceFromCall.toString());
        //
        console.log("updateUI");
    }

    return (
        <div className="mt-5">
            <div>{gamePanelT.inDevelopment}</div>
            <div className="flex justify-evenly">
                <CurrentRoundCard
                    updateUI={() => updateUI()}
                    currentRound={currentRound}
                    roundGamesPlayed={roundGamesPlayed}
                    roundHighestScore={roundHighestScore}
                    roundBestPlayer={roundBestPlayer}
                    gamePoolBalance={gamePoolBalance}
                    roundStart={roundStart}
                    roundEnd={roundEnd}
                    roundDuration={roundDuration}
                />
                <GlobalStatsCard
                    updateUI={() => updateUI()}
                    numberOfPlayers={numberOfPlayers}
                    gamesPlayedTotal={gamesPlayedTotal}
                    highestScoreEver={highestScoreEver}
                    bestPlayerEver={bestPlayerEver}
                    snakeTokenSupply={snakeTokenSupply}
                    snakeNftMintedTotal={snakeNftMintedTotal}
                    superPetNftMintedTotal={superPetNftMintedTotal}
                />
            </div>
        </div>
    );
}
