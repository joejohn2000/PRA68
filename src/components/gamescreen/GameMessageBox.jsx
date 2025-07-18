import React from "react";
import { Button } from "react-bootstrap";

const GameMessageBox = ({ messageText, option1, option2, fontSize }) => {
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
  );
};

export default GameMessageBox;
