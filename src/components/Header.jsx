/**
 * @file Header component for navigation, search, and sorting functionality.
 * @module Header
 */

import React from "react"; // Import React
import { Link } from "react-router-dom"; // Import Link component for navigation
import "./Header.css"; // Import the CSS for styling the header

/**
 * Header component provides navigation links, a search bar, and sorting options.
 * Sorting options change based on whether the user is on the Favourites page.
 *
 * @param {object} props - The component props.
 * @param {string} props.searchQuery - The current search query string.
 * @param {function} props.setSearchQuery - Function to update the search query.
 * @param {string} props.sortBy - The current sorting criteria for non-favourites pages.
 * @param {function} props.setSortBy - Function to update the sorting criteria for non-favourites pages.
 * @param {boolean} props.isFavouritesPage - A boolean indicating if the current page is the Favourites page.
 * @param {function} props.onSortFavourites - Function to handle sorting specifically for the Favourites page.
 * @returns {JSX.Element} The Header component.
 */
export default function Header({ searchQuery, setSearchQuery, sortBy, setSortBy, isFavouritesPage, onSortFavourites }) {
    return (
        <header className="header-container"> {/* Main header container */}
            <h2 className="header-title">Home</h2> {/* Page title */}

            <div className="search-and-sort-container"> {/* Container for search and sort elements */}
                <div className="search-bar-wrapper"> {/* Wrapper for the search input */}
                    <input
                        type="text" // Input type is text
                        placeholder="Search podcasts..." // Placeholder text for the search input
                        value={searchQuery} // Binds input value to searchQuery state
                        onChange={(e) => setSearchQuery(e.target.value)} // Updates searchQuery state on change
                        className="search-input" // CSS class for styling
                    />
                </div>

                {/* Conditional rendering for sorting dropdown based on page */}
                {!isFavouritesPage && ( // Render if not on the Favourites page
                    <div className="sort-dropdown-wrapper"> {/* Wrapper for the sort dropdown */}
                        <select
                            value={sortBy} // Binds select value to sortBy state
                            onChange={(e) => setSortBy(e.target.value)} // Updates sortBy state on change
                            className="sort-dropdown" // CSS class for styling
                        >
                            <option value="date-desc">Most Recent</option> {/* Option for sorting by most recent */}
                            <option value="title-asc">Title (A-Z)</option> {/* Option for sorting by title A-Z */}
                            <option value="title-desc">Title (Z-A)</option> {/* Option for sorting by title Z-A */}
                        </select>
                    </div>
                )}

                {isFavouritesPage && ( // Render if on the Favourites page
                    <div className="sort-dropdown-wrapper"> {/* Wrapper for the sort dropdown */}
                        <select
                            value={sortBy} // Binds select value to sortBy state
                            onChange={(e) => onSortFavourites(e.target.value)} // Calls onSortFavourites function on change
                            className="sort-dropdown" // CSS class for styling
                        >
                            <option value="date-desc">Most Recent</option> {/* Option for sorting by most recent */}
                            <option value="title-asc">Title (A-Z)</option> {/* Option for sorting by title A-Z */}
                        </select>
                    </div>
                )}
            </div>

            <nav className="header-nav"> {/* Navigation links container */}
                <Link to="/" className="header-link">Home</Link> {/* Link to the home page */}
                <Link to="/favourites" className="header-link">Favourites</Link> {/* Link to the favourites page */}
            </nav>
        </header>
    );
}
