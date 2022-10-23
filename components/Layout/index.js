import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({
    children,
    connected,
    pleaseConnect,
    notSupportedChain,
    supportedChains,
    homeButton,
    howToPlayButton,
    playerPanelButton,
    playGameButton,
    awardButton,
    highScoresButton,
    contactButton,
}) {
    return (
        <div className="font-sans pt-10 pb-80 bg-lime-300">
            <div className="mx-auto min-w-fit max-w-7xl overflow-hidden border-4 border-green-500 rounded-xl bg-gradient-to-r from-[#8ed622] via-[#fde047] to-[#a3e635]">
                <Header
                    connected={connected}
                    pleaseConnect={pleaseConnect}
                    notSupportedChain={notSupportedChain}
                    supportedChains={supportedChains}
                />
                <div className="flex">
                    <div className="m-5 p-5 flex-none">
                        <Navbar
                            homeButton={homeButton}
                            howToPlayButton={howToPlayButton}
                            playerPanelButton={playerPanelButton}
                            playGameButton={playGameButton}
                            awardButton={awardButton}
                            highScoresButton={highScoresButton}
                            contactButton={contactButton}
                        />
                    </div>
                    <div className="pr-10 flex-shrink">{children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
