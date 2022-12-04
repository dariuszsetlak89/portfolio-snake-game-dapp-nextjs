export default function GamePanel({ gamePanelT }) {
    return (
        <div>
            <div className="error text-center">{gamePanelT.inDevelopment}</div>
        </div>
    );
}
