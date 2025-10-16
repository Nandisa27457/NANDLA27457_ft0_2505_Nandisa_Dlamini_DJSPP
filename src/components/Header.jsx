import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ searchQuery, setSearchQuery, sortBy, setSortBy, isFavouritesPage, onSortFavourites }) {
    return (
        <header className="header-container">
            <h2 className="header-title">Home</h2>

            <div className="search-and-sort-container">
                <div className="search-bar-wrapper">
                    <input
                        type="text"
                        placeholder="Search podcasts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {!isFavouritesPage && (
                    <div className="sort-dropdown-wrapper">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-dropdown"
                        >
                            <option value="date-desc">Most Recent</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </select>
                    </div>
                )}

                {isFavouritesPage && (
                    <div className="sort-dropdown-wrapper">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortFavourites(e.target.value)}
                            className="sort-dropdown"
                        >
                            <option value="date-desc">Most Recent</option>
                            <option value="title-asc">Title (A-Z)</option>
                        </select>
                    </div>
                )}
            </div>

            <nav className="header-nav">
                <Link to="/" className="header-link">Home</Link>
                <Link to="/favourites" className="header-link">Favourites</Link>
            </nav>
        </header>
    );
}
