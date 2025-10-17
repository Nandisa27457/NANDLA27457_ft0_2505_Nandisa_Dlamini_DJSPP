/**
 * @file Podcasts component for displaying a grid of podcasts with search, sort, filter, and pagination.
 * @module Podcasts
 */

import React, { useState, useEffect, useMemo } from "react"; // Import React hooks
import Podcast from "./Podcast"; // Import the Podcast component
import { fetchPodcasts, fetchGenreTitles, formatDate } from "../utility"; // Import utility functions

/**
 * Podcasts component displays a list of podcasts, allowing users to search, sort,
 * filter by genre, and navigate through pages.
 *
 * @param {object} props - The component props.
 * @param {string} props.searchQuery - The current search query string from the Header.
 * @param {string} props.sortBy - The current sorting criteria from the Header.
 * @returns {JSX.Element} The Podcasts component.
 */
const Podcasts = ({ searchQuery, sortBy }) => {
    const [podcasts, setPodcasts] = useState([]); // State to store the fetched podcast data
    const [isLoading, setIsLoading] = useState(true); // State to manage the loading status

    // UI state for filtering and pagination
    const [selectedGenre, setSelectedGenre] = useState(""); // State for the selected genre filter
    const [currentPage, setCurrentPage] = useState(1); // State for the current page in pagination
    const itemsPerPage = 8; // Number of podcasts to display per page

    // useEffect hook to fetch podcast data when the component mounts
    useEffect(() => {
        /**
         * Asynchronously fetches podcast data from the API.
         */
        async function fetchData() {
            try {
                const data = await fetchPodcasts(); // Fetch podcast data
                setPodcasts(data); // Set the fetched data to the podcasts state
            } catch (error) {
                console.error("Error fetching podcasts:", error); // Log any errors during fetching
            } finally {
                setIsLoading(false); // Set loading state to false after data is fetched (or error occurs)
            }
        }
        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array ensures this effect runs only once on mount

    /**
     * Memoized list of podcasts after applying search, genre filter, and sorting.
     * Recomputes only when `podcasts`, `searchQuery`, `sortBy`, or `selectedGenre` changes.
     */
    const processedPodcasts = useMemo(() => {
        let result = [...podcasts]; // Create a mutable copy of the podcasts array

        // Search bar: Filter by search query
        if (searchQuery.trim() !== "") { // Check if the search query is not empty
            result = result.filter(
                (p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter podcasts where title includes the search query (case-insensitive)
            );
        }

        // Genre Filter: Filter by selected genre
        if (selectedGenre) { // Check if a genre is selected
            result = result.filter((p) => {
                const titles = getGenres(p.genres); // Get genre titles for each podcast (assuming getGenres is defined elsewhere)
                return titles.includes(selectedGenre); // Check if the selected genre is present in the podcast's genres
            });
        }

        // Dynamic Sorting: Sort based on sortBy state
        result.sort((a, b) => { // Sort the podcasts array
            if (sortBy === "date-desc")
                return new Date(b.lastUpdated) - new Date(a.lastUpdated); // Sort by last updated date, newest first
            if (sortBy === "title-asc") return a.title.localeCompare(b.title); // Sort by title in ascending order (A-Z)
            if (sortBy === "title-desc") return b.title.localeCompare(a.title); // Sort by title in descending order (Z-A)
            return 0; // No sorting if sortBy criteria is not matched
        });

        return result; // Return the processed list of podcasts
    }, [podcasts, searchQuery, sortBy, selectedGenre]); // Dependencies for memoization

    // Pagination calculations
    const totalPages = Math.ceil(processedPodcasts.length / itemsPerPage); // Calculate the total number of pages
    const startIndex = (currentPage - 1) * itemsPerPage; // Calculate the starting index for the current page
    const paginatedPodcasts = processedPodcasts.slice(
        startIndex, // Slice the processed podcasts array from the start index
        startIndex + itemsPerPage // To the end index for the current page
    );

    // useEffect hook to reset the current page to 1 when filters or search queries change
    useEffect(() => {
        setCurrentPage(1); // Reset to the first page
    }, [searchQuery, sortBy, selectedGenre]); // Dependencies for resetting page

    // Render loading indicator if data is still being fetched
    if (isLoading) {
        return (
            <div className="loading"> {/* Loading container */}
                <div className="loading-text">Loading...</div> {/* Loading text */}
            </div>
        );
    }

    return (
        <div>
            {/* Podcast Grid */}
            <div className="podcast-grid"> {/* Container for the grid of podcasts */}
                {paginatedPodcasts.map(
                    (podcast) => ( // Map through the paginated podcasts
                        <Podcast key={podcast.id} {...podcast} /> // Render a Podcast component for each podcast
                    )
                )}
            </div>

            {/* Pagination controls */}
            <div className="pagination"> {/* Container for pagination buttons */}
                {Array.from({ length: totalPages }, (_, i) => ( // Create an array for page numbers
                    <button
                        key={i + 1} // Unique key for each button
                        className={currentPage === i + 1 ? "active" : ""} // Apply 'active' class if it's the current page
                        disabled={currentPage === i + 1} // Disable the button for the current page
                        onClick={() => setCurrentPage(i + 1)} // Set the current page on button click
                    >
                        {i + 1} {/* Display the page number */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Podcasts; // Export the Podcasts component as default
