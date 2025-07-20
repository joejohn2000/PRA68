import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isAudioAllowed, setIsAudioAllowedState] = useState(() => {
    const stored = localStorage.getItem("isAudioAllowed");
    return stored === null ? true : stored === "true";
  });

  const setIsAudioAllowed = (value) => {
    localStorage.setItem("isAudioAllowed", value);
    setIsAudioAllowedState(value);
  };

  return (
    <AudioContext.Provider value={{ isAudioAllowed, setIsAudioAllowed }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPermission = () => useContext(AudioContext);
