import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAudioPermission } from "../../utils/AudioContext"; 
import SoundPromptModal from "./SoundPromptModal";
import GameTitleSection from "./GameTitleSection";
import InstructionsModal from "./InstructionsModal";
import useVoiceCommands from "./useVoiceCommands";

const StartScreen = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
    const stored = localStorage.getItem("isVoiceEnabled");
    return stored === null ? true : stored === "true";
  });

  const { isAudioAllowed, setIsAudioAllowed } = useAudioPermission();

  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleStart = useCallback(() => {
    audioRef.current?.pause();
    navigate("/game");
  }, [navigate]);

  const handleShowInstructions = useCallback(() => {
    setShowInstructions(true);
  }, []);

  const handleCloseInstructions = useCallback(() => {
    setShowInstructions(false);
    if ("speechSynthesis" in window && isVoiceEnabled && isAudioAllowed) {
      const utterance = new SpeechSynthesisUtterance("Instructions closed.");
      window.speechSynthesis.speak(utterance);
    }
  }, [isVoiceEnabled, isAudioAllowed]);

  const toggleVoice = () => {
    if (!isAudioAllowed) return;

    setIsVoiceEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("isVoiceEnabled", next);
      if (prev && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };


  useVoiceCommands(handleStart, handleShowInstructions, handleCloseInstructions, isVoiceEnabled, isAudioAllowed);

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
    setIsAudioAllowed(true);
    audioRef.current?.play().catch(console.warn);
    setShowSoundPrompt(false);
  };

  const handleCancelSound = () => {
    setIsAudioAllowed(false);

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    setShowSoundPrompt(false);
  };

  return (
    <main
      role="main"
      className="d-flex justify-content-center align-items-center vh-100 vw-100 position-relative bg-dark bg-opacity-75"
      style={{
        backgroundImage: "url('/images/background.gif')",
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

      {/* Voice Narration Toggle */}
      <label
        className={`position-absolute top-0 end-0 m-3 p-2 rounded text-white bg-dark bg-opacity-50 d-flex align-items-center`}
        style={{ cursor: isAudioAllowed ? "pointer" : "not-allowed" }}
      >
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={isVoiceEnabled}
          onChange={toggleVoice}
          disabled={!isAudioAllowed}
        />
        Enable Voice Narration
      </label>

      <GameTitleSection
        onStart={handleStart}
        onShowInstructions={handleShowInstructions}
      />

      <InstructionsModal
        show={showInstructions}
        onClose={handleCloseInstructions}
        isVoiceEnabled={isVoiceEnabled && isAudioAllowed}
      />
    </main>
  );
};

export default StartScreen;
