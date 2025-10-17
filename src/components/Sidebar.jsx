import React, { useEffect, useState } from "react";
import "./Sidebar.css";

export default function SideBar() {
    const [darkMode, setDarkMode] = useState(false);

    // Load saved theme preference on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") setDarkMode(true);
    }, []);

    
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="sidebar-container">
            <img
                className="main-logo"
                src="/microphone (2).png"
                alt="mic-logo"
                width="50px"
            />

            <div className="side-bar-icons">
                <img src="/homepage.png" alt="home" width="40px" />
                <img src="/like.png" alt="favourites" width="40px" />
                <img src="/plus-sign.png" alt="add" width="40px" />
                <img src="/video.png" alt="library" width="40px" />
            </div>

            {/* 🌗 Dark Mode Toggle Switch */}
            <div className="theme-toggle">
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}
