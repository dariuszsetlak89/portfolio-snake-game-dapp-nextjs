import Header from "./Header";
import TopNavbar from "./TopNavbar";
import Connector from "./Connector";
import SideNavbar from "./SideNavbar";
import Footer from "./Footer";

export default function Layout({ translations, children }) {
    const topNavbarTranslations = {
        howToPlayButton: translations.howToPlayButton,
    };

    const connectorTranslations = {
        connected: translations.connected,
        pleaseConnect: translations.pleaseConnect,
        notSupportedChain: translations.notSupportedChain,
        supportedChains: translations.supportedChains,
    };

    const sideNavbarTranslations = {
        homeButton: translations.homeButton,
        playerPanelButton: translations.playerPanelButton,
        playGameButton: translations.playGameButton,
        awardButton: translations.awardButton,
        highScoresButton: translations.highScoresButton,
        contactButton: translations.contactButton,
    };

    return (
        <div className="outerBackground">
            <div className="innerBackground">
                <Header />
                <TopNavbar topNavbarTranslations={topNavbarTranslations}>
                    <Connector connectorTranslations={connectorTranslations} />
                </TopNavbar>
                <div className="mainContent">
                    <SideNavbar className="sideNavbar" sideNavbarTranslations={sideNavbarTranslations} />
                    <div className="content">{children}</div>
                </div>
                <Footer className="footer" />
            </div>
        </div>
    );
}
