import { Button } from "@web3uikit/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function SideNavbar({ sideNavbarTranslations }) {
    const { t } = useTranslation(["common", "layout"]);

    return (
        <nav>
            <div className="p-4 w-64">
                <Link href="/">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={sideNavbarTranslations.homeButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4 w-64">
                <Link href="/player">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={sideNavbarTranslations.playerPanelButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4 w-64">
                <Link href="/game">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={sideNavbarTranslations.playGameButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4 w-64">
                <Link href="/awards">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={sideNavbarTranslations.awardButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4 w-64">
                <Link href="/highscores">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={sideNavbarTranslations.highScoresButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4 w-64">
                <Link href="/contact">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={sideNavbarTranslations.contactButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
        </nav>
    );
}
