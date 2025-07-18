import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const InstructionsModal = ({ show, onClose }) => (
  <Modal
    show={show}
    onHide={onClose}
    centered
    fullscreen="sm-down"
    backdropClassName="modal-backdrop-dark"
    aria-labelledby="instructionsTitle"
    aria-describedby="instructionsBody"
  >
    <Modal.Header closeButton style={{ backgroundColor: "rgba(0,0,0,0.85)", color: "white" }}>
      <Modal.Title id="instructionsTitle">How to Play</Modal.Title>
    </Modal.Header>
    <Modal.Body
      id="instructionsBody"
      style={{
        backgroundColor: "rgba(0,0,0,0.85)",
        color: "white",
        fontSize: "1.1rem",
        lineHeight: "1.6",
      }}
    >
      <ul>
        <li>🎧 Designed for visually and hearing-impaired users.</li>
        <li>🕹️ Use sound cues and feedback for decision making.</li>
        <li>🗣️ Say or click <strong>“Start”</strong> to begin the game.</li>
        <li>🎵 Music guides you emotionally and interactively.</li>
        <li>👂 Use headphones or assistive tech for best experience.</li>
      </ul>
    </Modal.Body>
    <Modal.Footer style={{ backgroundColor: "rgba(0,0,0,0.85)" }}>
      <Button variant="outline-light" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default InstructionsModal;
