export default function GamePanel({ gamePanelT }) {
    return (
        // In development
        <div>
            <div className="error text-center">{gamePanelT.inDevelopment}</div>
        </div>
    );
}
