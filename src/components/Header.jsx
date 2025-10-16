import { Link } from "react-router-dom";
import "./Header.css"; // make sure to import your CSS file

export default function Header() {
    return (
        <header className="header-container">
            <h2 className="header-title">Home</h2>

            <nav className="header-nav">
                <Link to="/" className="header-link">Home</Link>
                <Link to="/favourites" className="header-link">Favourites</Link>
            </nav>
        </header>
    );
}
