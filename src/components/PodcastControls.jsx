/**
 * @file PodcastControls component for search and filter functionalities.
 * @module PodcastControls
 */

import React from "react"; // Import React

/**
 * PodcastControls component provides input fields for searching and filtering podcasts.
 *
 * @param {object} props - The component props.
 * @param {string} props.searchQuery - The current search query string.
 * @param {function} props.setSearchQuery - Function to update the search query state.
 * @param {string} props.sortBy - The current sorting criteria.
 * @param {function} props.setSortBy - Function to update the sorting criteria state.
 * @param {string} props.selectedGenre - The currently selected genre for filtering.
 * @param {function} props.setSelectedGenre - Function to update the selected genre state.
 * @returns {JSX.Element} The PodcastControls component.
 */
const PodcastControls = ({
    // Props for control states and their respective setters
    searchQuery, // Current value of the search query
    setSearchQuery, // Function to update the search query
    sortBy, // Current value of the sort by criteria
    setSortBy, // Function to update the sort by criteria
    selectedGenre, // Current value of the selected genre
    setSelectedGenre, // Function to update the selected genre
}) => {
    return (
        <div className="podcast-controls"> {/* Main container for podcast controls */}
            {/* Search Input */}
            <input
                type="text" // Input type is text
                placeholder="Search podcasts.episodes and favourites..." // Placeholder text for the search input
                value={searchQuery} // Binds input value to the searchQuery state
                onChange={(e) => setSearchQuery(e.target.value)} // Updates searchQuery state basedon input change
            />
        </div>
    );
};

export default PodcastControls; // Export the PodcastControls component as default
