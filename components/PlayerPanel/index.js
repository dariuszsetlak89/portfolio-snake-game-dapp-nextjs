import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import { useNotification } from "@web3uikit/core";
import { contractAddresses, snakeGameAbi, tokenAbi, nftAbi } from "../../constants";
import GamesCard from "./GameCard";
import SnakeTokenCard from "./SnakeTokenCard/index.js";
import SnakeNftCard from "./SnakeNftCard/index.js";
import SuperPetNftCard from "./SuperPetNftCard/index.js";

export default function Player() {
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
    const [gameStartedFlag, setGameStartedFlag] = useState(false);
    const [superPetNftClaimFlag, setSuperPetNftClaimFlag] = useState(false);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [lastScore, setLastScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [snakeNftMinted, setSnakeNftMinted] = useState(0);
    const [superPetNftMinted, setSuperPetNftMinted] = useState(0);
    const [scoreRequired, setScoreRequired] = useState(0);
    const [snakeNftRequired, setSnakeNftRequired] = useState(0);
    const [snakeExchangeRate, setSnakeExchangeRate] = useState(0);
    const [superPetNftMintFee, setSuperPetNftMintFee] = useState(0);
    const [snakeAirdropAmount, setSnakeAirdropAmount] = useState(0);
    const [maxSnakeNfts, setMaxSnakeNfts] = useState(0);
    const [maxSuperPetNfts, setMaxSuperPetNfts] = useState(0);
    const [gameFee, setGameFee] = useState(0);
    const [snakeBalance, setSnakeBalance] = useState(0);
    const [snakeNftBalance, setSnakeNftBalance] = useState(0);
    const [superPetNftBalance, setSuperPetNftBalance] = useState(0);

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

    // Contract function: getPlayerDataFunction
    const { runContractFunction: getPlayerDataFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "getPlayerData",
        params: {
            _player: account,
        },
    });

    // Contract function: scoreRequiredFunction
    const { runContractFunction: scoreRequiredFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "i_scoreRequired",
        params: {},
    });

    // Contract function: snakeNftRequiredFunction
    const { runContractFunction: snakeNftRequiredFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "i_snakeNftRequired",
        params: {},
    });

    // Contract function: snakeExchangeRateFunction
    const { runContractFunction: snakeExchangeRateFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "i_snakeExchangeRate",
        params: {},
    });

    // Contract function: superPetNftMintFeeFunction
    const { runContractFunction: superPetNftMintFeeFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "i_superPetNftMintFee",
        params: {},
    });

    // Contract function: snakeAirdropAmountFunction
    const { runContractFunction: snakeAirdropAmountFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "SNAKE_AIRDROP",
        params: {},
    });

    // Contract function: maxSnakeNftsFunction
    const { runContractFunction: maxSnakeNftsFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "MAX_SNAKE_NFTS",
        params: {},
    });

    // Contract function: maxSuperPetNftsFunction
    const { runContractFunction: maxSuperPetNftsFunction } = useWeb3Contract({
        abi: snakeGameAbi,
        contractAddress: snakeGameAddress,
        functionName: "MAX_SUPER_PET_NFTS",
        params: {},
    });

    // Contract function: gameFeeCalculation
    const { runContractFunction: gameFeeCalculation } = useWeb3Contract({
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
            <div className="flex justify-evenly">
                <GamesCard
                    updateUI={() => updateUI()}
                    gamesPlayed={gamesPlayed}
                    lastScore={lastScore}
                    bestScore={bestScore}
                    gameStartedFlag={gameStartedFlag}
                />
                <SnakeTokenCard
                    updateUI={() => updateUI()}
                    snakeGameAddress={snakeGameAddress}
                    snakeGameAbi={snakeGameAbi}
                    snakeAirdropFlag={snakeAirdropFlag}
                    snakeBalance={snakeBalance}
                    gameFee={gameFee}
                    snakeAirdropAmount={snakeAirdropAmount}
                    snakeExchangeRate={snakeExchangeRate}
                    chainId={chainId}
                />
            </div>
            <div className="flex justify-evenly">
                <SnakeNftCard
                    updateUI={() => updateUI()}
                    scoreRequired={scoreRequired}
                    maxSnakeNfts={maxSnakeNfts}
                    snakeNftMinted={snakeNftMinted}
                    snakeNftBalance={snakeNftBalance}
                />
                <SuperPetNftCard
                    updateUI={() => updateUI()}
                    snakeGameAddress={snakeGameAddress}
                    snakeGameAbi={snakeGameAbi}
                    snakeNftAddress={snakeNftAddress}
                    superPetNftAddress={superPetNftAddress}
                    nftAbi={nftAbi}
                    superPetNftClaimFlag={superPetNftClaimFlag}
                    snakeNftRequired={snakeNftRequired}
                    superPetNftMintFee={superPetNftMintFee}
                    maxSuperPetNfts={maxSuperPetNfts}
                    superPetNftMinted={superPetNftMinted}
                    superPetNftBalance={superPetNftBalance}
                    snakeNftBalance={snakeNftBalance}
                    chainId={chainId}
                    account={account}
                />
            </div>
        </div>
    );
}
