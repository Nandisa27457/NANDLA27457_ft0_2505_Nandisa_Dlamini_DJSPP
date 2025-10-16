import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../components/FavouritesContext";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import "../HomePage.css"; // Import HomePage.css for styling
import useAudioPlayer from "../context/AudioPlayer";

export default function FavouritesPage() {
    const { favourites, toggleFavourite, isFavourite } = useFavourites();
    const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
    const [sortFavouritesBy, setSortFavouritesBy] = useState("date-desc");

    const sortedFavourites = useMemo(() => {
        let result = [...favourites];

        result.sort((a, b) => {
            if (sortFavouritesBy === "date-desc") {
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            }
            if (sortFavouritesBy === "title-asc") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
        return result;
    }, [favourites, sortFavouritesBy]);

    const handleSortFavourites = (value) => {
        setSortFavouritesBy(value);
    };

    return (
        <>
            <Header
                isFavouritesPage={true}
                onSortFavourites={handleSortFavourites}
                sortBy={sortFavouritesBy}
            />
            <SideBar />
            <div className="homepage-content">
                <h2 className="favourites-title">Your Favourites</h2>
                {sortedFavourites.length === 0 ? (
                    <p className="no-favourites-message">You haven't liked any episodes yet.</p>
                ) : (
                    <div className="favourites-list">
                        {sortedFavourites.map((episode) => (
                            <div key={`${episode.podcastId}-${episode.episode.id}`} className="episode-card">
                                <div className="episode-thumb">
                                    <img src={episode.image} alt={`${episode.title} thumb`} />
                                </div>
                                <div className="episode-info">
                                    <div
                                        className="episode-title"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                        }}>
                                        <span>
                                            Episode {episode.episode}:{" "}
                                            {episode.title}
                                        </span>
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "22px",
                                                color: isFavourite(episode)
                                                    ? "pink"
                                                    : "#aaa",
                                            }}
                                            onClick={() =>
                                                toggleFavourite(episode)
                                            }>
                                            ♥
                                        </span>
                                    </div>
                                    <p className="episode-desc">
                                        {episode.description}
                                    </p>
                                    <button
                                        className="play-button"
                                        onClick={() =>
                                            playTrack({
                                                id: `${episode.podcastId}-${episode.episode}`,
                                                title: episode.title,
                                                audio: episode.file,
                                                podcastTitle: episode.podcastTitle,
                                                image: episode.image,
                                            })
                                        }>
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
