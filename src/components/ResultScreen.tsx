import { FunctionalComponent } from 'preact';
import i18n from '../i18n/it';

interface Props {
    gameState: GameState,
    onRestart: () => void;
}

const ResultScreen: FunctionalComponent<Props> = ({ gameState, onRestart }) => {
    return (
        <div class="result-screen">
            <h2>Results</h2>
            <p>Player: {gameState.playerName}</p>
            <p>Quiz Count: {gameState.quizCount}</p>
            <p>Timeout: {gameState.timeout} seconds</p>
            <button class="primary" onClick={onRestart}>
                {i18n.restart}
            </button>
        </div>
    );
};
export default ResultScreen;
