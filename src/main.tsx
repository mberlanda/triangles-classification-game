import { render } from 'preact';
import { useState } from 'preact/hooks';
import './style/main.css';
import SetupScreen from './components/SetupScreen';
import Layout from './components/Layout';
import ResultScreen from './components/ResultScreen';

const App = () => {
  const [screen, setScreen] = useState<'setup' | 'quiz' | 'result'>('setup');
  const [playerName, setPlayerName] = useState('');
  const [quizCount, setQuizCount] = useState(10);
  const [timeout, setTimeoutValue] = useState(10);

  return (
    <Layout>
      {screen === 'setup' && (
        <SetupScreen
          onStart={(gameState) => {
            setPlayerName(gameState.playerName);
            setQuizCount(gameState.quizCount);
            setTimeoutValue(gameState.timeout);
            setScreen('result');
          }}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          gameState={{ playerName, quizCount, timeout }}
          onRestart={() => setScreen('setup')}
        />
      )}
      {/* TODO: Add quiz screen */}
    </Layout>
  );
};

render(<App />, document.getElementById('app')!);
