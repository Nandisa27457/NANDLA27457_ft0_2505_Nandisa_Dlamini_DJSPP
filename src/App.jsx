import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import FavouritesPage from "./Pages/FavouritesPage";
import PodcastPage from "./Pages/PodcastPage";
import { FavouritesProvider } from "../src/components/FavouritesContext";


export default function App() {
    return (
        <FavouritesProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/favourites" element={<FavouritesPage />} />
                    <Route path="/podcast/:id" element={<PodcastPage />} />
                </Routes>
            </Router>
        </FavouritesProvider>
    );
}


