import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GameBackground from "./GameBackground";
import SettingsDropdown from "./SettingsDropdown";
import GameMessageBox from "./GameMessageBox";
import useGameVoiceCommands from "./useGameVoiceCommands";

const Game = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const navigate = useNavigate();
  const utteranceRef = useRef(null);

  const messageText =
    "You find yourself at the edge of the forest. What will you do?";
  const option1 = "1. Enter Forest";
  const option2 = "2. Go Back";

  // Speech synthesis logic
  useEffect(() => {
    if (!fadeIn || muted) return;
    const utterance = new SpeechSynthesisUtterance(
      `${messageText}. Options are: ${option1} and ${option2}`
    );
    utterance.rate = 1;
    utteranceRef.current = utterance;

    const timeout = setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }, 2500);

    return () => {
      clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, [fadeIn, muted]);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  useGameVoiceCommands({
    setMuted,
    setFontSize,
    navigate,
  });

  return (
    <GameBackground fadeIn={fadeIn}>
      <div className="position-absolute top-0 end-0 p-3">
        <SettingsDropdown
          muted={muted}
          setMuted={setMuted}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      </div>

      {/* <div className="position-absolute top-0 start-0 p-3">
        <Button
          variant="outline-light"
          onClick={() => {
            window.speechSynthesis.cancel();
            navigate("/");
          }}
          size="sm"
          className="fw-bold"
        >
          Restart
        </Button>
      </div> */}

      <GameMessageBox
        messageText={messageText}
        option1={option1}
        option2={option2}
        fontSize={fontSize}
      />
    </GameBackground>
  );
};

export default Game;
