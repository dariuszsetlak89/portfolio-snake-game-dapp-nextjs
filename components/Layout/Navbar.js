import { Button, Checkbox } from "@web3uikit/core";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="mt-12 p-5">
            <div className="p-4">
                <Link href="/">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text="HOME"
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4">
                <Link href="/player">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text="PLAYER"
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4">
                <Link href="/game">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text="GAME"
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4">
                <Link href="/awards">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text="AWARDS"
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4">
                <Link href="/highscores">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text="HIGH SCORES"
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="p-4">
                <Link href="/contact">
                    <a>
                        <Button
                            color="green"
                            onClick={function noRefCheck() {}}
                            text="CONTACT"
                            theme="colored"
                            size="xl"
                            isFullWidth
                        />
                    </a>
                </Link>
            </div>
            <div className="mx-4 mt-12 p-3 flex justify-center bg-lime-300">
                <Image src="/flags/polish-flag.png" alt="Polish flag" width={32} height={32} />
                <div className="px-2 flex content-center">
                    <Checkbox
                        checked
                        id="test-switch"
                        label=""
                        layout="switch"
                        name="Test switch input"
                        onBlur={function noRefCheck() {}}
                        onChange={function noRefCheck() {}}
                    />
                </div>
                <Image src="/flags/british-flag.png" alt="British flag" width={32} height={32} />
            </div>
        </nav>
    );
}
