import Image from "next/image";

export default function Header() {
    return (
        <div className="header">
            <div className="headerLogo">
                <Image src="/images/snake-right.png" alt="Snake logo" width={150} height={150} />
            </div>
            <div className="headerCaption">
                <Image
                    src="/images/snake-game-dapp.png"
                    alt="Snake wordart"
                    width={800}
                    height={150}
                    priority="true"
                    className="w-auto"
                />
            </div>
            <div className="headerLogo">
                <Image src="/images/snake-left.png" alt="Snake logo" width={150} height={150} />
            </div>
        </div>
    );
}
