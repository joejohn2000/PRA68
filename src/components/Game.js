import React, { useEffect, useState, useRef } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { GearFill, VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const navigate = useNavigate();
  const utteranceRef = useRef(null);

  const messageText =
    "You find yourself at the edge of the forest. What will you do?";
  const option1 = "Enter Forest";
  const option2 = "Go Back";

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => {
      clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    let speechTimeout;

    if (fadeIn && !muted && window.speechSynthesis) {
      window.speechSynthesis.cancel();

      speechTimeout = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(
          `${messageText}. Options are: ${option1} and ${option2}`
        );
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
        utteranceRef.current = utterance;
      }, 2500);
    } else if (fadeIn) {
      window.speechSynthesis.cancel();
    }

    return () => {
      clearTimeout(speechTimeout);
      window.speechSynthesis.cancel();
    };
  }, [fadeIn, muted, fontSize]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "fs-6";
      case "large":
        return "fs-1";
      default:
        return "fs-4";
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInFromBlack {
            0% { opacity: 0; background-color: black; }
            100% { opacity: 1; background-color: transparent; }
          }

          .fade-in {
            animation: fadeInFromBlack 2.5s ease-in-out forwards;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .settings-icon:hover {
            animation: spin 1s linear infinite;
          }

          .dropdown-toggle::after {
            display: none !important;
          }
        `}
      </style>

      <div className="vh-100 vw-100 bg-black position-relative">
        <div
          className={`position-absolute top-0 start-0 w-100 h-100 ${
            fadeIn ? "fade-in" : ""
          }`}
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="position-absolute top-0 end-0 p-3">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="dark"
                className="settings-icon border-0 bg-transparent p-0"
                as="button"
              >
                <GearFill size={28} color="white" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Audio</Dropdown.Header>
                <Dropdown.Item
                  onClick={() => setMuted((prev) => !prev)}
                  aria-label="Toggle mute"
                >
                  {muted ? (
                    <>
                      <VolumeMuteFill className="me-2" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <VolumeUpFill className="me-2" />
                      Mute
                    </>
                  )}
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Header>Font Size</Dropdown.Header>
                <Dropdown.Item onClick={() => setFontSize("small")}>
                  Small
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFontSize("medium")}>
                  Medium
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFontSize("large")}>
                  Large
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="position-absolute top-0 start-0 p-3">
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
          </div>

          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 w-100 px-3">
            <div className="bg-dark bg-opacity-75 text-white p-4 rounded shadow-lg text-center">
              <p className={`mb-3 ${getFontSizeClass()}`}>{messageText}</p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-info" className={getFontSizeClass()}>
                  {option1}
                </Button>
                <Button variant="outline-light" className={getFontSizeClass()}>
                  {option2}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
