import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/startscreen/StartScreen";
import Game from "./components/gamescreen/Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
