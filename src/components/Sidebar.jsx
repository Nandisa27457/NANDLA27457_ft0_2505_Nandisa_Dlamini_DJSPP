import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar-container">
            <img
                className="main-logo"
                src="public/microphone (2).png"
                alt="mic-logo"
                width="50px"
            />
            <div className="side-bar-icons">
                <img src="/homepage.png" alt="home" width="40px" />
                <img src="/like.png" alt="favourites" width="40px" />
                <img src="/plus-sign.png" alt="add" width="40px" />
                <img src="/video.png" alt="library" width="40px" />
            </div>
        </div>
    );
}
