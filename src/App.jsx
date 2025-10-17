/**
 * @file App component is the main entry point of the React application, setting up routing and global state management.
 * @module App
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing components from React Router
import "./App.css"; // Import the main CSS styles for the app
import HomePage from "./Pages/HomePage"; // Import the HomePage component
import FavouritesPage from "./Pages/FavouritesPage"; // Import the FavouritesPage component
import PodcastPage from "./Pages/PodcastPage"; // Import the PodcastPage component
import { FavouritesProvider } from "../src/components/FavouritesContext"; // Import the FavouritesProvider for managing favourite episodes
import { AudioPlayerProvider } from "./context/AudioPlayer"; // Import the AudioPlayerProvider for global audio playback state
import AudioPlayerBar from "./components/AudioPlayerBar"; // Import the AudioPlayerBar component for audio controls

/**
 * App component sets up the application with routing, global state providers for favourites and audio player,
 * and renders the audio player bar at the bottom of the screen.
 * @returns {JSX.Element} The root App component.
 */
export default function App() {
    return (
        <FavouritesProvider> {/* Wrap the app with FavouritesProvider to manage favourite episodes globally */}
            <AudioPlayerProvider> {/* Wrap the app with AudioPlayerProvider to manage audio playback state globally */}
                <Router> {/* Set up client-side routing with BrowserRouter */}
                    <Routes> {/* Define the application's routes */}
                        <Route path="/" element={<HomePage />} /> {/* Route for the home page */}
                        <Route
                            path="/favourites"
                            element={<FavouritesPage />} // Route for the favourites page
                        />
                        <Route path="/podcast/:id" element={<PodcastPage />} /> {/* Route for individual podcast pages with dynamic ID */}
                    </Routes>
                </Router>
                {/* Render the AudioPlayerBar component at the bottom of the screen for persistent audio controls */}
                <AudioPlayerBar />
            </AudioPlayerProvider>
        </FavouritesProvider>
    );
}
