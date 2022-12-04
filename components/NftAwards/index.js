import Link from "next/link";

export default function NftAwards({ nftAwardsT }) {
    return (
        <div>
            <div className="text-center">
                <Link href="https://portfolio-nft-marketplace.vercel.app/">
                    <a target="_blank">
                        <button className="myButtonLimeLong">{nftAwardsT.nftMarketplaceButton}</button>
                    </a>
                </Link>
            </div>
            <div className="error text-center">{nftAwardsT.inDevelopment}</div>
        </div>
    );
}
