import { useEffect } from "react";

const useVoiceCommands = (onStart, onShowInstructions) => {
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

      if (transcript.includes("start")) {
        onStart();
      } else if (
        transcript.includes("how to play") ||
        transcript.includes("how")
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
      } else if (transcript.includes("stop") || transcript.includes("cancel")) {
        window.speechSynthesis.cancel();
      }
    };

    recognition.onerror = (event) => console.warn("Speech error:", event.error);
    recognition.start();

    return () => recognition.stop();
  }, [onStart, onShowInstructions]);
};

export default useVoiceCommands;
