import React from "react";

const Header = ({ handleToggleDarkMode }) => {
    return (
        <div className="header">
            {/* Heading for the app */}
            <h1>Notes</h1> 
            {/* Button for toggling dark mode */}
            <button 
                onClick= {() => 
                    handleToggleDarkMode(
                        (previousDarkMode) => !previousDarkMode
                    )
                } 
                className="save">
                    Toggle Mode
            </button>
        </div>
    );
};

export default Header;