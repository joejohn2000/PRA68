import { useEffect, useRef } from "react";

const useVoiceCommands = (
  onStart,
  onShowInstructions,
  onCloseInstructions,
  active
) => {
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!active) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase();

      if (transcript.includes("start")) {
        onStart();
      } else if (
        transcript.includes("how to play") ||
        transcript.includes("help") ||
        transcript.includes("show instructions")
      ) {
        onShowInstructions();
        setTimeout(() => {
          const modalBody = document.getElementById("instructionsBody");
          if (modalBody && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(modalBody.innerText);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          }
        }, 500);
      } else if (
        transcript.includes("close") ||
        transcript.includes("stop") ||
        transcript.includes("cancel")
      ) {
        onCloseInstructions();
        window.speechSynthesis.cancel();
      }
    };

    recognition.onerror = (event) => console.warn("Speech error:", event.error);

    recognition.start();

    return () => recognition.stop();
  }, [active, onStart, onShowInstructions, onCloseInstructions]);
};

export default useVoiceCommands;
