import Link from "next/link";
import LangSwitcher from "./LangSwitcher";

export default function TopNavbar({ topNavbarTranslations, children }) {
    return (
        <div className="navbar">
            <div className="topNavbarButton">
                <Link href="/">
                    <LangSwitcher />
                </Link>
            </div>
            <div className="topNavbarChildren">{children}</div>
            <div className="topNavbarButton">
                <Link href="/">
                    <button className="myButtonLime">{topNavbarTranslations.howToPlayButton}</button>
                </Link>
            </div>
        </div>
    );
}
