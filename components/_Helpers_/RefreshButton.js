import Image from "next/image";

export default function RefreshButton({ buttonStyle, buttonWidth, buttonHeight, onClickAction }) {
    return (
        // Refresh button
        <div className={buttonStyle}>
            <Image
                src="/images/refresh.png"
                alt="Refresh button"
                width={buttonWidth}
                height={buttonHeight}
                onClick={onClickAction}
                className="hover:animate-spin"
            />
        </div>
    );
}
