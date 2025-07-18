import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

const SoundPromptModal = ({ onAccept, onReject, onEnableVoice, onDisableVoice }) => {
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

      if (transcript.includes("enable voice")) {
        onEnableVoice?.();
      } else if (transcript.includes("disable voice")) {
        onDisableVoice?.();
      } else if (transcript.includes("yes")) {
        onAccept();
      } else if (transcript.includes("no") || transcript.includes("cancel")) {
        onReject();
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [onAccept, onReject, onEnableVoice, onDisableVoice]);

  return (
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
          Music enhances the atmosphere. Would you like to start with background audio?
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="info" size="lg" onClick={onAccept}>
            Enable Voice
          </Button>
          <Button variant="outline-light" size="lg" onClick={onReject}>
            Cancel Voice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SoundPromptModal;
