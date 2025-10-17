/**
 * @file FavouritesPage.jsx
 * @module Pages/FavouritesPage
 * @description
 * The FavouritesPage component renders a user’s list of favourite podcast episodes.
 * It allows sorting favourites, toggling likes, and playing audio via the global audio player context.
 *
 * This page combines global context data (Favourites + Audio) with local UI controls.
 *
 * @requires react
 * @requires react-router-dom
 * @requires ../components/FavouritesContext
 * @requires ../components/Header
 * @requires ../components/Sidebar
 * @requires ../context/AudioPlayer
 * @requires ../HomePage.css
 */

import React, { useState, useMemo } from "react"; // Core React hooks
import { Link } from "react-router-dom"; // Router link for navigation (if used)
import { useFavourites } from "../components/FavouritesContext"; // Custom favourites context
import Header from "../components/Header"; // Header component (with sort menu)
import SideBar from "../components/Sidebar"; // Sidebar for navigation
import "./HomePage.css"; // Shared page styles
import useAudioPlayer from "../context/AudioPlayer"; // Audio control context

/**
 * @typedef {Object} Episode
 * @property {string} podcastId - Unique ID of the parent podcast.
 * @property {number|string} episode - Episode number or ID.
 * @property {string} title - Title of the episode.
 * @property {string} description - Description of the episode.
 * @property {string} image - Thumbnail or cover art URL.
 * @property {string} file - Audio file URL for playback.
 * @property {string} podcastTitle - Title of the podcast this episode belongs to.
 * @property {Date|string} dateAdded - When the user marked it as a favourite.
 */

/**
 * @function FavouritesPage
 * @description
 * Renders the “Favourites” page that displays all episodes a user has liked.
 * Provides sorting controls (by date or title), play/pause audio controls, and the ability to remove items from favourites.
 *
 * @returns {JSX.Element} The rendered favourites page with interactive audio controls.
 *
 * @example
 * // Basic usage
 * <FavouritesPage />
 */
export default function FavouritesPage() {
    // Extract favourite-related logic from the global context
    const { favourites, toggleFavourite, isFavourite } = useFavourites();

    // Extract audio playback logic from the global AudioPlayer context
    const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

    // Local state to store the user's selected sorting option
    const [sortFavouritesBy, setSortFavouritesBy] = useState("date-desc");

    /**
     * Compute a sorted version of the user's favourites.
     * useMemo ensures we only re-sort when dependencies change.
     *
     * @type {Episode[]}
     */
    const sortedFavourites = useMemo(() => {
        // Defensive copy to avoid mutating the original array
        let result = [...favourites];

        // Sort according to the user's selected preference
        result.sort((a, b) => {
            if (sortFavouritesBy === "date-desc") {
                // Sort by most recent first (newest favourites first)
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            }
            if (sortFavouritesBy === "title-asc") {
                // Sort alphabetically (A–Z)
                return a.title.localeCompare(b.title);
            }
            // Default: no sorting applied
            return 0;
        });
        return result;
    }, [favourites, sortFavouritesBy]);

    /**
     * Update the sort state when user selects a new option.
     * @param {"date-desc"|"title-asc"} value - The sorting method selected by the user.
     */
    const handleSortFavourites = (value) => {
        setSortFavouritesBy(value);
    };

    // ===============================
    // RENDER LOGIC
    // ===============================

    return (
        <>
            {/* Header component handles sorting controls and page title */}
            <Header
                isFavouritesPage={true}
                onSortFavourites={handleSortFavourites}
                sortBy={sortFavouritesBy}
            />

            {/* Sidebar with navigation options */}
            <SideBar />

            {/* Main container for content */}
            <div className="homepage-content">
                {/* Page title */}
                <h2 className="favourites-title">Your Favourites</h2>

                {/* Conditional rendering:
                    If no favourites exist, show a friendly message.
                    Otherwise, render the list of episodes. */}
                {sortedFavourites.length === 0 ? (
                    <p className="no-favourites-message">
                        You haven't liked any episodes yet.
                    </p>
                ) : (
                    <div className="favourites-list">
                        {sortedFavourites.map((episode) => (
                            <div
                                key={`${episode.podcastId}-${episode.episode.id}`} // Unique React key for rendering list
                                className="episode-card"
                            >
                                {/* Left side: thumbnail image */}
                                <div className="episode-thumb">
                                    <img
                                        src={episode.image}
                                        alt={`${episode.title} thumbnail`}
                                    />
                                </div>

                                {/* Right side: text and controls */}
                                <div className="episode-info">
                                    {/* Title area with heart icon */}
                                    <div
                                        className="episode-title"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        {/* Episode title and number */}
                                        <span>
                                            Episode {episode.episode}:{" "}
                                            {episode.title}
                                        </span>

                                        {/* Heart icon toggles favourite status */}
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "22px",
                                                color: isFavourite(episode)
                                                    ? "pink" // Highlighted if already liked
                                                    : "#aaa", // Gray if not
                                            }}
                                            onClick={() =>
                                                toggleFavourite(episode)
                                            }
                                        >
                                            ♥
                                        </span>
                                    </div>

                                    {/* Short description of the episode */}
                                    <p className="episode-desc">
                                        {episode.description}
                                    </p>

                                    {/* Play button — uses context-based audio control */}
                                    <button
                                        className="play-button"
                                        onClick={() =>
                                            playTrack({
                                                id: `${episode.podcastId}-${episode.episode}`, // Unique identifier
                                                title: episode.title,
                                                audio: episode.file, // Audio file source URL
                                                podcastTitle:
                                                    episode.podcastTitle,
                                                image: episode.image,
                                            })
                                        }
                                    >
                                        {/* Conditional label:
                                            If this episode is currently playing, show Pause,
                                            otherwise show Play. */}
                                        {currentTrack?.id ===
                                            `${episode.podcastId}-${episode.episode}` &&
                                        isPlaying
                                            ? "⏸ Pause"
                                            : "▶ Play"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
