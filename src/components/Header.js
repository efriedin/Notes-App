import React from "react";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      {/* Heading for the app */}
      <h2>Notes</h2>
      {/* Button for toggling dark mode */}
      <button
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        className="save"
      >
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;
