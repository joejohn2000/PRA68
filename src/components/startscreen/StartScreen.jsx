import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SoundPromptModal from "./SoundPromptModal";
import GameTitleSection from "./GameTitleSection";
import InstructionsModal from "./InstructionsModal";
import useVoiceCommands from "./useVoiceCommands";

const StartScreen = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleStart = useCallback(() => {
    audioRef.current?.pause();
    navigate("/game");
  }, [navigate]);

  useVoiceCommands(handleStart, setShowInstructions);

  useEffect(() => {
    const audio = new Audio("/sounds/background_sound.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handlePlaySound = () => {
    audioRef.current?.play().catch(console.warn);
    setShowSoundPrompt(false);
  };

  const handleCancelSound = () => setShowSoundPrompt(false);

  return (
    <main
      role="main"
      className="d-flex justify-content-center align-items-center vh-100 vw-100 position-relative"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {showSoundPrompt && (
        <SoundPromptModal
          onAccept={handlePlaySound}
          onReject={handleCancelSound}
        />
      )}

      <GameTitleSection
        onStart={handleStart}
        onShowInstructions={() => setShowInstructions(true)}
      />

      <InstructionsModal
        show={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </main>
  );
};

export default StartScreen;
