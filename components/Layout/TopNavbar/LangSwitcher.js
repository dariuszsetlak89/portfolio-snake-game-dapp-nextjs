import Image from "next/image";
import Link from "next/link";

export default function LangSwitcher() {
    return (
        <div className="langSwitcher">
            <div className="langSwitcherFlag">
                <Link href="" locale={"pl"}>
                    <Image src="/images/flags/polish-flag.png" alt="Polish flag" width={64} height={64} />
                </Link>
            </div>
            <div className="langSwitcherFlag">
                <Link href="" locale={"en"}>
                    <Image src="/images/flags/british-flag.png" alt="British flag" width={64} height={64} />
                </Link>
            </div>
        </div>
    );
}
