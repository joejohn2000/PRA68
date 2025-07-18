import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const StartScreen = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const navigate = useNavigate();
  const audioRef = useRef(null);

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

  const handleCancelSound = () => {
    setShowSoundPrompt(false);
  };

  const handleStart = useCallback(() => {
    audioRef.current?.pause();
    navigate("/game");
  }, [navigate]);

  // 🎤 Voice Command Integration
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      console.log("Transcript:", transcript);
      if (transcript.includes("start")) handleStart();
      else if (
        transcript.includes("how to play") ||
        transcript.includes("how")
      ) {
        setShowInstructions(true);
        setTimeout(() => {
          const modalBody = document.getElementById("instructionsBody");
          if (modalBody && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(modalBody.innerText);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          }
        }, 500);
      } else if (transcript.includes("stop") || transcript.includes("cancel")) {
        window.speechSynthesis.cancel();
      }
    };

    recognition.onerror = (event) =>
      console.warn("Speech recognition error:", event.error);
    recognition.start();

    return () => recognition.stop();
  }, [handleStart]);

  return (
    <main
      role="main"
      className="d-flex justify-content-center align-items-center vh-100 vw-100 position-relative"
      aria-label="Start Screen"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showSoundPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="soundModalLabel"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            zIndex: 1050,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div
            className="text-white text-center p-5 rounded-4 shadow-lg"
            style={{
              background: "rgba(15, 15, 30, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              maxWidth: "90%",
            }}
          >
            <h2 id="soundModalLabel" className="mb-3 fw-bold text-info">
              🔊 Enable Sound?
            </h2>
            <p className="mb-4 text-light">
              Music enhances the atmosphere. Would you like to start with
              background audio?
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="info"
                size="lg"
                onClick={handlePlaySound}
                aria-label="Enable sound and play game audio"
              >
                Yes, Play
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={handleCancelSound}
                aria-label="Continue without sound"
              >
                No, Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      <section
        aria-labelledby="gameTitle"
        className="p-5 rounded text-center shadow-lg bg-black bg-opacity-50"
      >
        <h1
          id="gameTitle"
          className="display-3 fw-bold text-info"
          style={{
            fontFamily: "Georgia, serif",
            animation: "neonFlicker 2s infinite ease-in-out",
          }}
        >
          Echoes of Choice
        </h1>

        <p className="mt-3 fs-5 text-light">
          Press <strong>Enter</strong>, click <strong>Start</strong>, or say{" "}
          <strong>"Start"</strong>
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Button
            variant="outline-info"
            size="lg"
            onClick={handleStart}
            aria-label="Start the game"
          >
            Start
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => setShowInstructions(true)}
            aria-label="Show game instructions"
          >
            How to Play
          </Button>
        </div>
      </section>

      <Modal
        show={showInstructions}
        onHide={() => setShowInstructions(false)}
        centered
        fullscreen="sm-down"
        backdropClassName="modal-backdrop-dark"
        aria-labelledby="instructionsTitle"
        aria-describedby="instructionsBody"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "white",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Modal.Title id="instructionsTitle">How to Play</Modal.Title>
        </Modal.Header>
        <Modal.Body
          id="instructionsBody"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "white",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          <ul>
            <li>🎧 Designed for visually and hearing-impaired users.</li>
            <li>🕹️ Use sound cues and feedback for decision making.</li>
            <li>
              🗣️ Say or click <strong>“Start”</strong> to begin the game.
            </li>
            <li>🎵 Music guides you emotionally and interactively.</li>
            <li>👂 Use headphones or assistive tech for best experience.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", borderTop: "none" }}
        >
          <Button
            variant="outline-light"
            onClick={() => setShowInstructions(false)}
            aria-label="Close instructions"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default StartScreen;
