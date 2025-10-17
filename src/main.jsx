import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SideBar from "./components/Sidebar.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* 
                Sidebar Section
                ----------------
                - Provides navigation links (e.g., Home, Favourites).
                - Persistent across pages for consistent layout.
            */}
        <SideBar />
        <App />
    </StrictMode>
);
