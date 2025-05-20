import { render } from 'preact';
import { useState } from 'preact/hooks';
import './style/main.css';
import SetupScreen from './components/SetupScreen';
import Layout from './components/Layout';

const App = () => {
  const [screen, setScreen] = useState<'setup' | 'quiz' | 'result'>('setup');
  const [playerName, setPlayerName] = useState('');
  const [quizCount, setQuizCount] = useState(10);
  const [timeout, setTimeoutValue] = useState(10);

  return (
    <Layout>
      {screen === 'setup' && (
      <SetupScreen
        onStart={(name, count, time) => {
            setPlayerName(name);
            setQuizCount(count);
            setTimeoutValue(time);
            setScreen('quiz');
          }}
        />
      )}
      {/* TODO: Add quiz and result screens */}
    </Layout>
  );
};

render(<App />, document.getElementById('app')!);
