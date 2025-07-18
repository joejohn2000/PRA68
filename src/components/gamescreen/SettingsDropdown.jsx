import React from "react";
import { Dropdown } from "react-bootstrap";
import { GearFill, VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons";

const SettingsDropdown = ({ muted, setMuted, fontSize, setFontSize }) => (
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
        <Dropdown.Item onClick={() => setFontSize("small")}>Small</Dropdown.Item>
        <Dropdown.Item onClick={() => setFontSize("medium")}>Medium</Dropdown.Item>
        <Dropdown.Item onClick={() => setFontSize("large")}>Large</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
);

export default SettingsDropdown;
