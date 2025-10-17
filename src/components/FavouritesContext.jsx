/**
 * @file FavouritesContext provides a way to manage and access favourite episodes across the application.
 * @module FavouritesContext
 */

import React, { createContext, useContext, useState, useEffect } from "react"; // Import React hooks

// Create a context for managing favourite episodes
const FavouritesContext = createContext();

/**
 * Custom hook to access the FavouritesContext.
 * @returns {object} The context value containing favourites, toggleFavourite, and isFavourite functions.
 */
export function useFavourites() {
    return useContext(FavouritesContext); // Return the context value
}

/**
 * Provides the FavouritesContext to its children components.
 * Manages the state of favourite episodes, including loading from and saving to local storage.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} The FavouritesProvider component.
 */
export function FavouritesProvider({ children }) {
    // Initialize favourites state from local storage or an empty array
    const [favourites, setFavourites] = useState(() => {
        const stored = localStorage.getItem("favouriteEpisodes"); // Get stored favourites from local storage
        return stored ? JSON.parse(stored) : []; // Parse if exists, otherwise return empty array
    });

    // useEffect hook to save favourites to local storage whenever the favourites state changes
    useEffect(() => {
        localStorage.setItem("favouriteEpisodes", JSON.stringify(favourites)); // Store favourites as a JSON string
    }, [favourites]); // Dependency array ensures this effect runs when 'favourites' changes

    /**
     * Toggles an episode's favourite status. Adds it if not favourite, removes if already favourite.
     * @param {object} episode - The episode object to toggle. Must contain `podcastId` and `episode` properties.
     */
    function toggleFavourite(episode) {
        // Check if the episode already exists in favourites
        const exists = favourites.some(
            (e) =>
                e.podcastId === episode.podcastId && // Compare podcastId
                e.episode === episode.episode // Compare episode number
        );
        if (exists) {
            // If episode exists, remove it from favourites
            setFavourites(
                favourites.filter(
                    (e) =>
                        !(
                            e.podcastId === episode.podcastId && // Filter out the matching episode
                            e.episode === episode.episode
                        )
                )
            );
        } else {
            // If episode does not exist, add it to favourites with a dateAdded timestamp
            setFavourites([...favourites, { ...episode, dateAdded: new Date().toISOString() }]);
        }
    }

    /**
     * Checks if a given episode is marked as a favourite.
     * @param {object} episode - The episode object to check. Must contain `podcastId` and `episode` properties.
     * @returns {boolean} True if the episode is a favourite, false otherwise.
     */
    function isFavourite(episode) {
        // Check if any favourite matches the given episode's podcastId and episode number
        return favourites.some(
            (e) =>
                e.podcastId === episode.podcastId && // Compare podcastId
                e.episode === episode.episode // Compare episode number
        );
    }

    return (
        // Provide the favourites state and functions to children components
        <FavouritesContext.Provider
            value={{ favourites, toggleFavourite, isFavourite }}>
            {children} {/* Render children components */}
        </FavouritesContext.Provider>
    );
}
