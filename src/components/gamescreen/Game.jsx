import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GameBackground from "./GameBackground";
import SettingsDropdown from "./SettingsDropdown";
import GameMessageBox from "./GameMessageBox";
import useGameVoiceCommands from "./useGameVoiceCommands";
import { useAudioPermission } from "../../utils/AudioContext";  // import your context

const sceneData = {
  backgroundImageUrl: "/images/background.jpg",
  context: "You find yourself at the edge of the forest. What will you do?",
  option1: "Enter the forest",
  option2: "Go back",
};

const Game = () => {
  const { isAudioAllowed } = useAudioPermission();  // get audio permission state

  const [fadeIn, setFadeIn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [voiceNarrationOn, setVoiceNarrationOn] = useState(() => {
    const stored = localStorage.getItem("isVoiceEnabled");
    return stored === null ? true : stored === "true";
  });

  const [fontSize, setFontSize] = useState("medium");
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  const handleSceneChange = (choice) => {
    console.log("Scene changed via:", choice);
    // Scene change logic goes here
  };

  // Detect user interaction to allow audio playback
  useEffect(() => {
    const handleUserClick = () => {
      setUserHasInteracted(true);
      document.removeEventListener("click", handleUserClick);
    };

    document.addEventListener("click", handleUserClick);
    return () => document.removeEventListener("click", handleUserClick);
  }, []);

  // Update muted and voiceNarrationOn if audio not allowed
  useEffect(() => {
    if (!isAudioAllowed) {
      setMuted(true);
      setVoiceNarrationOn(false);
      window.speechSynthesis.cancel();
    }
  }, [isAudioAllowed]);

  // Background audio setup
  useEffect(() => {
    if (!userHasInteracted) return;
    if (!isAudioAllowed || muted) return;  // Do NOT play audio if disallowed or muted

    const audio = new Audio("/sounds/background_sound.mp3");
    audio.loop = true;
    audio.volume = 0.1;
    audioRef.current = audio;

    audio.play().catch(console.warn);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [userHasInteracted, muted, isAudioAllowed]);

  // Narration logic
  useEffect(() => {
    if (!fadeIn || muted || !voiceNarrationOn || !isAudioAllowed) return;

    const utterance = new SpeechSynthesisUtterance(
      `${sceneData.context}. Options are: ${sceneData.option1} and ${sceneData.option2}`
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
  }, [fadeIn, muted, voiceNarrationOn, isAudioAllowed]);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Voice command hook
  useGameVoiceCommands({
    setMuted,
    setFontSize,
    navigate,
  });

  return (
    <GameBackground fadeIn={fadeIn} backgroundImage={sceneData.backgroundImageUrl}>
      {/* Voice Narration Toggle */}
      <div className="position-absolute top-0 start-0 p-3 d-flex align-items-center gap-2">
        <label style={{ color: "white", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={voiceNarrationOn}
            onChange={() => {
              const next = !voiceNarrationOn;
              localStorage.setItem("isVoiceEnabled", next);
              if (voiceNarrationOn && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
              }
              setVoiceNarrationOn(next);
            }}

            disabled={!isAudioAllowed} // disable toggle if audio disallowed
          />
          Voice Narration
        </label>
      </div>

      {/* Settings Dropdown */}
      <div className="position-absolute top-0 end-0 p-3 d-flex align-items-center gap-2">
        <SettingsDropdown
          muted={muted}
          setMuted={setMuted}
          fontSize={fontSize}
          setFontSize={setFontSize}
          disableAudio={!isAudioAllowed}  // optional prop to disable audio controls inside dropdown
        />
      </div>

      {/* Narration Prompt */}
      {!userHasInteracted && isAudioAllowed && (
        <div className="position-absolute top-50 start-50 translate-middle text-white bg-dark p-3 rounded shadow">
          Click anywhere to enable sound
        </div>
      )}

      {/* Main Game Box */}
      <GameMessageBox
        messageText={sceneData.context}
        option1={sceneData.option1}
        option2={sceneData.option2}
        onOption1Click={() => handleSceneChange("option1")}
        onOption2Click={() => handleSceneChange("option2")}
        fontSize={fontSize}
      />
    </GameBackground>
  );
};

export default Game;
