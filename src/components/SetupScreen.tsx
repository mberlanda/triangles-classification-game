import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import i18n from '../i18n/it';

interface Props {
  onStart: (gameState: GameState) => void;
}

const SetupScreen: FunctionalComponent<Props> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [quizCount, setQuizCount] = useState(10);
  const [timeout, setTimeout] = useState(10);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart({ playerName: name.trim(), quizCount, timeout });
  };

  return (
    <div class="setup-screen">
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)} required />
        </label>
        <br />
        <label>
          {i18n.quizLength}:
          <select value={quizCount} onChange={(e) => setQuizCount(parseInt((e.target as HTMLSelectElement).value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
        <br />
        <label>
          {i18n.timeout}:
          <input
            type="range"
            min="5"
            max="20"
            step="5"
            value={timeout}
            onInput={(e) => setTimeout(parseInt((e.target as HTMLInputElement).value))}
          />
          <span>{timeout} seconds</span>
        </label>
        <br />
        <button class="primary" type="submit">{i18n.start}</button>
      </form>
    </div>
  );
};

export default SetupScreen;

