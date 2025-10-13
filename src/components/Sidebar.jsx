import React from "react";

export default function SideBar() {
    return (
        <div   className= "sidebar-container">
            <div>
                <img className = "main-logo" src="public/microphone.png" alt="mic-logo" width="50px" />
            </div>
            <div className="side-bar-content">
                <div className= "container">
            <img src="./public/building.png" alt="home-logo" width="50px" />
            <img src="./public/heart (1).png" alt="heart-logo" width="50px" />
            <img src="./public/plus-minus.png" alt="plus-logo" width="50px" />
            <img src="./public/video.png" alt="library-logo" width="50px" />
            </div>
            </div>
        </div>
    );
}
