import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import FavouritesPage from "./Pages/FavouritesPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
