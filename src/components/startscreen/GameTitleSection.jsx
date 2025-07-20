import React from "react";
import Button from "react-bootstrap/Button";

const GameTitleSection = ({ onStart, onShowInstructions }) => (
  <section
    aria-labelledby="gameTitle"
    className="p-5 rounded text-center shadow-lg bg-black bg-opacity-100"
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
      <Button variant="outline-info" size="lg" onClick={onStart}>Start</Button>
      <Button variant="outline-light" size="lg" onClick={onShowInstructions}>
        How to Play
      </Button>
    </div>
  </section>
);

export default GameTitleSection;
