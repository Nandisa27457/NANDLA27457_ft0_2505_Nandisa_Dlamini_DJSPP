import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import FavouritesPage from "./Pages/FavouritesPage";
import PodcastPage from "./Pages/PodcastPage";
import { FavouritesProvider } from "../src/components/FavouritesContext";
import { AudioPlayerProvider } from "./context/AudioPlayer";
import AudioPlayerBar from "./components/AudioPlayerBar";

export default function App() {
    return (
        <FavouritesProvider>
            <AudioPlayerProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/favourites"
                            element={<FavouritesPage />}
                        />
                        <Route path="/podcast/:id" element={<PodcastPage />} />
                    </Routes>
                </Router>
                {/**Keeps audio player playing at bottom of screen */}
                <AudioPlayerBar />
            </AudioPlayerProvider>
        </FavouritesProvider>
    );
}
