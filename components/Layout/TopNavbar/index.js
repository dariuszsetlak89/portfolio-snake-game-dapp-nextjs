import { useRouter } from "next/router";
import Image from "next/image";
import LangSwitcher from "./LangSwitcher";

export default function TopNavbar({ topNavbarTranslations, children }) {
    ////////////////////
    // useRouter Hook //
    ////////////////////
    const router = useRouter();

    return (
        <div className="topNavbar">
            <div className="topNavbarButton">
                <LangSwitcher />
            </div>
            <div className="topNavbarChildren">{children}</div>
            <div className="topNavbarButton">
                {/* Refresh button */}
                <div className="refreshButton">
                    <Image
                        src="/images/refresh.png"
                        alt="Refresh button"
                        width={40}
                        height={40}
                        onClick={() => router.reload()}
                        className="hover:animate-spin"
                    />
                </div>
            </div>
        </div>
    );
}
