export default function readNativeCurrencyName(chainId) {
    let nativeCurrencyName = "";
    switch (chainId) {
        case 31337:
            nativeCurrencyName = "Hardhat ETH";
            break;
        case 1:
            nativeCurrencyName = "ETH";
            break;
        case 5:
            nativeCurrencyName = "Goerli ETH";
            break;
        case 137:
            nativeCurrencyName = "MATIC";
            break;
        case 80001:
            nativeCurrencyName = "Mumbai MATIC";
            break;
        default:
            nativeCurrencyName = "";
    }
    return nativeCurrencyName;
}
