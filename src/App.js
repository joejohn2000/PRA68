import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/startscreen/StartScreen";
import Game from "./components/gamescreen/Game";
import { AudioProvider } from "./utils/AudioContext";

function App() {
  return (
    <AudioProvider>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </AudioProvider>
  );
}

export default App;
