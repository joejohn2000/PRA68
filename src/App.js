import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
