import React, { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export function useFavourites() {
    return useContext(FavouritesContext);
}

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState(() => {
        const stored = localStorage.getItem("favouriteEpisodes");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favouriteEpisodes", JSON.stringify(favourites));
    }, [favourites]);

    function toggleFavourite(episode) {
        const exists = favourites.some(
            (e) =>
                e.podcastId === episode.podcastId &&
                e.episode === episode.episode
        );
        if (exists) {
            setFavourites(
                favourites.filter(
                    (e) =>
                        !(
                            e.podcastId === episode.podcastId &&
                            e.episode === episode.episode
                        )
                )
            );
        } else {
            setFavourites([...favourites, episode]);
        }
    }

    function isFavourite(episode) {
        return favourites.some(
            (e) =>
                e.podcastId === episode.podcastId &&
                e.episode === episode.episode
        );
    }

    return (
        <FavouritesContext.Provider
            value={{ favourites, toggleFavourite, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
}
