import React from "react";

const GameBackground = ({ children, fadeIn }) => {
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
          {children}
        </div>
      </div>
    </>
  );
};

export default GameBackground;
