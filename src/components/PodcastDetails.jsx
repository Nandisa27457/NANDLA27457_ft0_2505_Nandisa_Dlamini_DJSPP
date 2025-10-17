/**
 * @file PodcastDetails component displays detailed information about a specific podcast,
 * including its seasons and episodes, with playback and favourite toggling functionality.
 * @module PodcastDetails
 */

import React, { useEffect, useState } from "react"; // Import React hooks
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and URL parameters
import { useFavourites } from "./FavouritesContext"; // Import custom hook for managing favourites
import { fetchPodcastDetails, formatDate } from "../utility"; // Import utility functions for fetching data and formatting dates
import useAudioPlayer from "../context/AudioPlayer"; // Import custom hook for audio player context

/**
 * PodcastDetails component fetches and displays detailed information for a single podcast.
 * It includes podcast metadata, a list of seasons and episodes, and allows users to
 * play episodes and mark them as favourites.
 * @returns {JSX.Element} The PodcastDetails component.
 */
export default function PodcastDetails() {
    const { id } = useParams(); // Get the podcast ID from the URL parameters
    const navigate = useNavigate(); // Hook for programmatic navigation
    const { toggleFavourite, isFavourite } = useFavourites(); // Destructure favourite functions from context
    const { playTrack, currentTrack, isPlaying } = useAudioPlayer(); // Destructure audio player functions and states from context

    const [data, setData] = useState(null); // State to store podcast details
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to store any error messages
    const [selectedSeason, setSelectedSeason] = useState(null); // State to store the currently selected season

    /**
     * Calculates the total number of episodes across all seasons.
     * @returns {number} The total number of episodes.
     */
    function getTotalEpisodes() {
        // If no data or seasons array is not valid, return 0
        if (!data || !Array.isArray(data.seasons)) return 0;
        // Reduce seasons array to sum up episode lengths
        return data.seasons.reduce(
            (sum, s) => sum + (s.episodes?.length || 0), // Add episode count for each season
            0 // Initial sum is 0
        );
    }

    // useEffect hook to fetch podcast details when the ID changes
    useEffect(() => {
        /**
         * Asynchronously loads podcast details from the API.
         */
        async function load() {
            setLoading(true); // Set loading to true before fetching
            try {
                const res = await fetchPodcastDetails(id); // Fetch podcast details using the ID
                setData(res); // Set the fetched data to state
                // If seasons exist, set the first season as selected
                if (res?.seasons?.length > 0) {
                    setSelectedSeason(res.seasons[0].season);
                }
            } catch (err) {
                console.error(err); // Log any errors
                setError(err.message || "Failed to load details"); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetch completes
            }
        }
        if (id) load(); // Call load function if ID is available
    }, [id]); // Dependency array ensures this effect runs when 'id' changes

    // Conditional rendering based on loading, error, and data states
    if (loading) return <h1>Loading…</h1>; // Display loading message
    if (error) return <p className="error">Error: {error}</p>; // Display error message
    if (!data) return <p>No details found.</p>; // Display no details message

    const seasons = data.seasons || []; // Get seasons data, default to empty array
    const currentSeason =
        seasons.find((s) => String(s.season) === String(selectedSeason)) ||
        seasons[0]; // Find the selected season or default to the first season

    return (
        <div className="podcast-details"> {/* Main container for podcast details */}
            {/* Header section of the podcast details */}
            <div className="podcast-header">
                <div className="poster"> {/* Container for podcast image */}
                    {data.image && <img src={data.image} alt={data.title} />} {/* Display podcast image */}
                </div>
                <div className="podcast-main"> {/* Container for podcast main information */}
                    <h1 className="podcast-title">{data.title}</h1> {/* Podcast title */}
                    <p className="podcast-desc">{data.description}</p> {/* Podcast description */}

                    <div className="stats-grid"> {/* Grid for displaying podcast statistics */}
                        <div className="stat"> {/* Individual statistic item */}
                            <h4>Genres</h4> {/* Stat title */}
                            <p>
                                {Array.isArray(data.genres) // Check if genres is an array
                                    ? data.genres.join(", ") // Join genres with a comma if array
                                    : data.genres} {/* Display genres */}
                            </p>
                        </div>
                        <div className="stat"> {/* Individual statistic item */}
                            <h4>Last updated</h4> {/* Stat title */}
                            <p>{formatDate(data.updated)}</p> {/* Formatted last updated date */}
                        </div>
                        <div className="stat"> {/* Individual statistic item */}
                            <h4>Total seasons</h4> {/* Stat title */}
                            <p>{seasons.length}</p> {/* Total number of seasons */}
                        </div>
                        <div className="stat"> {/* Individual statistic item */}
                            <h4>Total episodes</h4> {/* Stat title */}
                            <p>{getTotalEpisodes()}</p> {/* Total number of episodes */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Season selector dropdown */}
            {seasons.length > 0 && ( // Render if there are seasons available
                <div className="season-select"> {/* Container for season selection */}
                    <label>Choose season:</label> {/* Label for the dropdown */}
                    <select
                        value={selectedSeason} // Binds select value to selectedSeason state
                        onChange={(e) => setSelectedSeason(e.target.value)}> {/* Updates selectedSeason on change */}
                        {seasons.map((s) => ( // Map through seasons to create options
                            <option key={s.season} value={s.season}> {/* Option for each season */}
                                {s.title || `Season ${s.season}`} {/* Display season title or default */}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Episodes list */}
            <div className="seasons-list"> {/* Container for the list of seasons */}
                {seasons.map((season) => ( // Map through seasons to display each season's episodes
                    <div key={season.season} className="season-card"> {/* Card for an individual season */}
                        <div className="season-poster"> {/* Container for season image */}
                            {season.image && ( // Display season image if available
                                <img src={season.image} alt={season.title} />
                            )}
                        </div>

                        <div className="season-body"> {/* Container for season details and episodes */}
                            <h3 className="season-title"> {/* Season title */}
                                {season.title || `Season ${season.season}`} {/* Display season title or default */}
                            </h3>
                            <p className="season-desc">{season.description}</p> {/* Season description */}

                            <div className="episodes"> {/* Container for episodes within a season */}
                                {(season.episodes || []).map((ep, idx) => ( // Map through episodes to display each episode
                                    <div
                                        key={ep.episode || idx} // Unique key for each episode
                                        className="episode-card"> {/* Card for an individual episode */}
                                        {season.image && ( // Display episode thumbnail if season image is available
                                            <div className="episode-thumb">
                                                <img
                                                    src={season.image}
                                                    alt={`${ep.title} thumb`}
                                                />
                                            </div>
                                        )}

                                        <div className="episode-info"> {/* Container for episode information */}
                                            <div
                                                className="episode-title" // CSS class for episode title
                                                style={{ // Inline styles for title layout
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    width: "100%",
                                                }}>
                                                <span> {/* Episode number and title */}
                                                    Episode {ep.episode}:{" "}
                                                    {ep.title}
                                                </span>

                                                {/* Heart favourite toggle button */}
                                                <span
                                                    style={{ // Inline styles for favourite icon
                                                        cursor: "pointer",
                                                        fontSize: "22px",
                                                        color: isFavourite({ // Dynamically set color based on favourite status
                                                            ...ep,
                                                            season: season.season,
                                                            podcastId: data.id,
                                                        })
                                                            ? "pink" // Pink if favourite
                                                            : "#aaa", // Grey if not favourite
                                                    }}
                                                    onClick={() => // On click, toggle favourite status
                                                        toggleFavourite({
                                                            ...ep,
                                                            season: season.season,
                                                            podcastId: data.id,
                                                            podcastTitle:
                                                                data.title,
                                                        })
                                                    }>
                                                    ♥ {/* Heart icon */}
                                                </span>
                                            </div>

                                            <p className="episode-desc"> {/* Episode description */}
                                                {ep.description}
                                            </p>

                                            {/* Global play button for episodes */}
                                            <button
                                                className="play-button" // CSS class for play button
                                                onClick={() => // On click, play the track
                                                    playTrack({
                                                        id: `${data.id}-${ep.episode}`, // Unique ID for the track
                                                        title: ep.title, // Episode title
                                                        audio: ep.file, // Audio file URL
                                                        podcastTitle: data.title, // Podcast title
                                                        image:
                                                            season.image || // Use season image or podcast image
                                                            data.image,
                                                    })
                                                }>
                                                {currentTrack?.id === // Check if this episode is currently playing
                                                    `${data.id}-${ep.episode}` &&
                                                isPlaying // And if it's playing
                                                    ? "⏸ Pause" // Display pause button
                                                    : "▶ Play"} {/* Display play button */}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
