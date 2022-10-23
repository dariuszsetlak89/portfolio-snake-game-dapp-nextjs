import { Button } from "@web3uikit/core";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import LangSwitcher from "./LangSwitcher";

export default function Navbar({
    homeButton,
    howToPlayButton,
    playerPanelButton,
    playGameButton,
    awardButton,
    highScoresButton,
    contactButton,
}) {
    const { t } = useTranslation(["common", "layout"]);

    return (
        <nav>
            <div className="p-4 w-64">
                <Link href="/">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={homeButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4 w-64">
                <Link href="/howtoplay">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text={howToPlayButton}
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
                            text={playerPanelButton}
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
                            text={playGameButton}
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
                            text={awardButton}
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
                            text={highScoresButton}
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
                            text={contactButton}
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <LangSwitcher />
        </nav>
    );
}
