import { useEffect } from "react";

const useGameVoiceCommands = ({ setMuted, setFontSize, navigate }) => {
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
      console.log("Voice:", transcript);

      if (transcript.includes("mute")) {
        setMuted(true);
        window.speechSynthesis.cancel();
      } else if (transcript.includes("unmute")) {
        setMuted(false);
      }

      if (transcript.includes("small font")) setFontSize("small");
      else if (transcript.includes("medium font")) setFontSize("medium");
      else if (transcript.includes("large font")) setFontSize("large");

      if (transcript.includes("restart")) {
        window.speechSynthesis.cancel();
        navigate("/");
      }
    };

    recognition.onerror = (e) => console.warn("Voice error:", e.error);
    recognition.start();

    return () => recognition.stop();
  }, [setMuted, setFontSize, navigate]);
};

export default useGameVoiceCommands;
