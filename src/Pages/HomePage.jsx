/**
 * @file HomePage.jsx
 * @module Pages/HomePage
 * @description
 * The main landing page of the podcast web app.
 * Displays the header (with search + sorting), sidebar navigation, recommended shows carousel,
 * and the list of all available podcasts filtered by search and sorting preferences.
 *
 * This component acts as a layout controller and passes down
 * user interaction data (search text and sorting choice) to child components.
 *
 * @requires react
 * @requires ../components/Sidebar
 * @requires ../components/Header
 * @requires ../components/Podcasts
 * @requires ../components/RecommendedShows
 * @requires ./HomePage.css
 */

import React, { useState } from "react"; // Import React and useState for component state management
import SideBar from "../components/Sidebar"; // Navigation sidebar component
import Header from "../components/Header"; // Header component (contains search and sort inputs)
import Podcasts from "../components/Podcasts"; // Main podcast list component
import RecommendedShows from "../components/RecommendedShows"; // Recommended shows carousel
import "./HomePage.css"; // Import page-specific styles

/**
 * @function HomePage
 * @description
 * The HomePage component renders the main view of the app, combining navigation,
 * search/sort functionality, and dynamic podcast content.
 *
 * It maintains two primary state values:
 * - `searchQuery`: The current text entered in the search bar.
 * - `sortBy`: The user’s selected sorting method (e.g., date or title).
 *
 * @returns {JSX.Element} A structured homepage with header, sidebar, recommendations, and podcast listings.
 *
 * @example
 * // Basic usage
 * <HomePage />
 */
export default function HomePage() {
    /**
     * @state {string} searchQuery - Stores the current search term entered by the user.
     * This value is passed to the Podcasts component to filter results in real-time.
     */
    const [searchQuery, setSearchQuery] = useState("");

    /**
     * @state {string} sortBy - Stores the user's selected sorting method.
     * Possible values: `"date-desc"` (newest first), `"title-asc"` (alphabetical), etc.
     */
    const [sortBy, setSortBy] = useState("date-desc");

    // =========================
    // RENDER LOGIC
    // =========================
    return (
        <>
            {/* 
                Header Section
                ----------------
                - Displays app title, search input, and sorting dropdown.
                - Receives controlled state props to handle user input dynamically.
                - The `isFavouritesPage` flag tells the Header to display the right UI layout.
            */}
            <Header
                searchQuery={searchQuery} // Current search value
                setSearchQuery={setSearchQuery} // Updates searchQuery when user types
                sortBy={sortBy} // Current sorting option
                setSortBy={setSortBy} // Updates sorting when dropdown changes
                isFavouritesPage={false} // Ensures the Header shows search/sort UI, not favourites mode
            />

            {/* 
                Sidebar Section
                ----------------
                - Provides navigation links (e.g., Home, Favourites).
                - Persistent across pages for consistent layout.
            */}
            <SideBar />

            {/* 
                Recommended Section
                --------------------
                - Displays a horizontal carousel of recommended podcasts or shows.
                - Typically curated from trending or similar content.
            */}
            <RecommendedShows />

            {/* 
                Podcasts Section
                -----------------
                - Displays the main podcast grid/list.
                - Dynamically filters based on `searchQuery`.
                - Sorts results based on the `sortBy` state.
            */}
            <Podcasts
                searchQuery={searchQuery}
                sortBy={sortBy}
            />
        </>
    );
}
