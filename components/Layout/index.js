import Header from "./Header";
import TopNavbar from "./TopNavbar";
import Connector from "./Connector";
import SideNavbar from "./SideNavbar";
import Footer from "./Footer";

export default function Layout({ connectorT, sideNavbarT, supportedChainIDs, children }) {
    return (
        <div className="outerBackground">
            <div className="innerBackground">
                <Header />
                <TopNavbar>
                    <Connector connectorT={connectorT} supportedChainIDs={supportedChainIDs} />
                </TopNavbar>
                <div className="mainContent">
                    <SideNavbar className="sideNavbar" sideNavbarT={sideNavbarT} />
                    <div className="content">{children}</div>
                </div>
                <Footer className="footer" />
            </div>
        </div>
    );
}
