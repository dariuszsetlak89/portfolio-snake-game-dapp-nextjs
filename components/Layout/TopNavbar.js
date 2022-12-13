import { useRouter } from "next/router";
import LangSwitcher from "./LangSwitcher";
import RefreshButton from "../_Helpers_/RefreshButton";

export default function TopNavbar({ children }) {
    const router = useRouter();

    return (
        <nav className="topNavbarNav">
            {/* Language switcher button */}
            <div className="topNavbarButton">
                <LangSwitcher />
            </div>
            {/* Connector */}
            <div className="topNavbarChildren">{children}</div>
            {/* Refresh button */}
            <div className="topNavbarButton">
                <RefreshButton
                    buttonStyle={"refreshButton"}
                    buttonWidth={40}
                    buttonHeight={40}
                    onClickAction={() => router.reload()}
                />
            </div>
        </nav>
    );
}
