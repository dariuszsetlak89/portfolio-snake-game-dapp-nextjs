import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function SideNavbar({ sideNavbarTranslations }) {
    const { t } = useTranslation(["common", "layout"]);

    return (
        <nav className="sideNavbarNav">
            <div className="">
                <Link href="/">
                    <button type="button" className="myMenuButton">
                        {sideNavbarTranslations.homeButton}
                    </button>
                </Link>
            </div>
            <div className="">
                <Link href="/player/">
                    <button type="button" className="myMenuButton">
                        {sideNavbarTranslations.playerPanelButton}
                    </button>
                </Link>
            </div>
            <div className="">
                <Link href="/snakegame/">
                    <button type="button" className="myMenuButton">
                        {sideNavbarTranslations.playGameButton}
                    </button>
                </Link>
            </div>
            <div className="">
                <Link href="/awards/">
                    <button type="button" className="myMenuButton">
                        {sideNavbarTranslations.awardButton}
                    </button>
                </Link>
            </div>
            <div className="">
                <Link href="/highscores/">
                    <button type="button" className="myMenuButton">
                        {sideNavbarTranslations.highScoresButton}
                    </button>
                </Link>
            </div>
        </nav>
    );
}
