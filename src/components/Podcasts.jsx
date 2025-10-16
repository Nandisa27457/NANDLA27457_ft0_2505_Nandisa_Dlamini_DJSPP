import React, { useState, useEffect, useMemo } from "react";
import Podcast from "./Podcast";
import { fetchPodcasts, fetchGenreTitles, formatDate } from "../utility";

/**
 *
 * @returns Podcasts component with search, sort, filter, and pagination
 */

const Podcasts = ({ searchQuery, sortBy }) => {
    const [podcasts, setPodcasts] = useState([]); // Data state
    const [isLoading, setIsLoading] = useState(true); //loading state

    // UI state
    const [selectedGenre, setSelectedGenre] = useState(""); //genre filter state
    const [currentPage, setCurrentPage] = useState(1); //pagination state
    const itemsPerPage = 8; //items per page

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchPodcasts(); //fetch podcast data
                setPodcasts(data); //set data state
            } catch (error) {
                console.error("Error fetching podcasts:", error); //error handling
            } finally {
                setIsLoading(false); //set loading state to false when done loading
            }
        }
        fetchData();
    }, []);

    // Derived list
    const processedPodcasts = useMemo(() => {
        let result = [...podcasts]; //copy of podcasts array

        // Search bar
        // Filter by search query
        if (searchQuery.trim() !== "") {
            //check if search query is not empty
            result = result.filter(
                (
                    p //filter podcasts based on search query
                ) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) //case insensitive search
            );
        }

        // Genre Filter;
        // Filter by selected genre
        if (selectedGenre) {
            //filter if a genre is selected
            result = result.filter((p) => {
                //filter podcasts based on selected genre
                const titles = getGenres(p.genres); //get genre titles for each podcast
                return titles.includes(selectedGenre); //check if selected genre is in podcast genres
            });
        }

        // Dynamic Sorting
        // Sort based on sortBy state
        result.sort((a, b) => {
            //sort podcasts based on sortBy state
            if (sortBy === "date-desc")
                return new Date(b.lastUpdated) - new Date(a.lastUpdated); //newest first
            if (sortBy === "title-asc") return a.title.localeCompare(b.title); //title A-Z
            if (sortBy === "title-desc") return b.title.localeCompare(a.title); //title Z-A
            return 0; //no sorting
        });

        return result;
    }, [podcasts, searchQuery, sortBy, selectedGenre]); //recompute when dependencies change

    // Pagination
    const totalPages = Math.ceil(processedPodcasts.length / itemsPerPage); //calculate total pages
    const startIndex = (currentPage - 1) * itemsPerPage; //calculate start index for current page
    const paginatedPodcasts = processedPodcasts.slice(
        startIndex, //slice podcasts for current page
        startIndex + itemsPerPage //end index
    );

    // Reset page when filters change
    useEffect(() => {
        //reset current page to 1 when filters change
        setCurrentPage(1); ///reset to first page
    }, [searchQuery, sortBy, selectedGenre]); //reset when dependencies change

    // Loading state
    if (isLoading) {
        //show loading indicator while data is being fetched
        return (
            <div className="loading">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Podcast Grid */}
            <div className="podcast-grid">
                {paginatedPodcasts.map(
                    (
                        podcast //map through paginated podcasts
                    ) => (
                        <Podcast key={podcast.id} {...podcast} /> //podcast component for each podcast
                    )
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1} //button for each page
                        className={currentPage === i + 1 ? "active" : ""} //highlight active page
                        disabled={currentPage === i + 1} //disable button for current page
                        onClick={() => setCurrentPage(i + 1)} //set current page on click
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Podcasts;
