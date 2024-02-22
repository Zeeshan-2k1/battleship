import Home from './pages/home';
import GameScreen from './pages/game';
import Rules from './pages/rules';
import Settings from './pages/settings';
import Dashboard from './pages/dashboard';

import 'react-simple-toasts/dist/theme/dark.css';
import { toastConfig } from 'react-simple-toasts';

toastConfig({
  theme: 'dark',
});

function App() {
  return (
    <main className="app">
      <GameScreen />
      <Home />
      <Rules />
      <Settings />
      <Dashboard />
    </main>
  );
}

export default App;
