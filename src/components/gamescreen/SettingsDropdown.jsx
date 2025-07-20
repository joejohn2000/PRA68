import React from "react";
import { Dropdown } from "react-bootstrap";
import { GearFill, VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SettingsDropdown = ({ muted, setMuted, fontSize, setFontSize }) => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
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


     <Dropdown align="end">
        <Dropdown.Toggle
          variant="dark"
          className="settings-icon border-0 bg-transparent p-0"
          as="button"
        >
          <GearFill size={28} color="white" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="p-0 m-0 border-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",   // translucent white
            backdropFilter: "blur(10px)",                    // blur behind
            WebkitBackdropFilter: "blur(10px)",              // Safari support
            borderRadius: "0.5rem",                           // rounded corners
            border: "1px solid rgba(255, 255, 255, 0.3)",    // subtle border
            minWidth: "12rem",
          }}
        >
          <Dropdown.Header className="px-3 py-2  text-light">Audio</Dropdown.Header>
          <Dropdown.Item
            onClick={() => setMuted((prev) => !prev)}
            aria-label="Toggle mute"
            className="px-3 py-2 text-light"
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

          <Dropdown.Divider className="my-1" />

          <Dropdown.Header className="px-3 py-2  text-light ">Font Size</Dropdown.Header>
          <Dropdown.Item className="px-3 py-2 text-light" onClick={() => setFontSize("small")}>Small</Dropdown.Item>
          <Dropdown.Item className="px-3 py-2 text-light" onClick={() => setFontSize("medium")}>Medium</Dropdown.Item>
          <Dropdown.Item className="px-3 py-2 text-light" onClick={() => setFontSize("large")}>Large</Dropdown.Item>

          <Dropdown.Divider className="my-1" />

          <Dropdown.Item
            className="px-3 py-2 text-light"
            onClick={() => {
              window.speechSynthesis.cancel();
              navigate("/");
            }}
          >
            Exit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SettingsDropdown;
