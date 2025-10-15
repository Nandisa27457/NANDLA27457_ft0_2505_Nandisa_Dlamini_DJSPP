import React from "react";

export default function SideBar() {
    return (
        <div className="sidebar-container">
            <img className="main-logo" src="public/microphone.png" alt="mic-logo" width="50px" />
            <div className="side-bar-icons">
                <img src="./public/building.png" alt="home" width="40px" />
                <img src="./public/heart (1).png" alt="favourites" width="40px" />
                <img src="./public/plus-minus.png" alt="add" width="40px" />
                <img src="./public/video.png" alt="library" width="40px" />
            </div>
        </div>
    );
}
