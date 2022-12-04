import Link from "next/link";

export default function SideNavbar({ sideNavbarT }) {
    return (
        <nav className="sideNavbarNav">
            <div>
                <Link href="/">
                    <button type="button" className="myMenuButton">
                        {sideNavbarT.homeButton}
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/player-panel">
                    <button type="button" className="myMenuButton">
                        {sideNavbarT.playerPanelButton}
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/play-game">
                    <button type="button" className="myMenuButton">
                        {sideNavbarT.playGameButton}
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/nft-awards">
                    <button type="button" className="myMenuButton">
                        {sideNavbarT.nftAwardsButton}
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/game-panel">
                    <button type="button" className="myMenuButton">
                        {sideNavbarT.gamePanelButton}
                    </button>
                </Link>
            </div>
        </nav>
    );
}
