import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";

export default function LangSwitcher() {
    // const { locale, locales } = useRouter();

    return (
        <div className="mt-4 ml-8 p-4 w-48 flex flex-row justify-around border-2 bg-lime-400 border-lime-500">
            <div className="border-lime-500 border-4">
                <div className="px-2 py-0 flex-none cursor-pointer">
                    <Link href="" locale={"pl"}>
                        <Image
                            src="/images/flags/polish-flag.png"
                            alt="Polish flag"
                            width={64}
                            height={64}
                        />
                    </Link>
                </div>
            </div>
            <div className="border-lime-500 border-4">
                <div className="px-2 py-0 flex-none cursor-pointer">
                    <Link href="" locale={"en"} className={"border-4"}>
                        <Image
                            src="/images/flags/british-flag.png"
                            alt="British flag"
                            width={64}
                            height={64}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
