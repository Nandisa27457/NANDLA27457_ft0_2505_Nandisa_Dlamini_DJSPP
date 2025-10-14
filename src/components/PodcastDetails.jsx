import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPodcastDetails, formatDate } from "../utility";

export default function PodcastDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    function getTotalEpisodes() {
        if (!data || !Array.isArray(data.seasons)) return 0;
        return data.seasons.reduce(
            (sum, s) => sum + (s.episodes?.length || 0),
            0
        );
    }

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetchPodcastDetails(id);
                setData(res);
                if (res && res.seasons && res.seasons.length > 0) {
                    setSelectedSeason(res.seasons[0].season);
                }
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load details");
            } finally {
                setLoading(false);
            }
        }

        if (id) load();
    }, [id]);

    if (loading) return <h1>Loading</h1>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!data) return <p>No details found.</p>;

    const seasons = data.seasons || [];
    const currentSeason =
        seasons.find((s) => String(s.season) === String(selectedSeason)) ||
        seasons[0];

    return (
        <div className="podcast-details">
            {/* Header: image + title + description */}
            <div className="podcast-header">
                <div className="poster">
                    {data.image && <img src={data.image} alt={data.title} />}
                </div>
                <div className="podcast-main">
                    <h1 className="podcast-title">{data.title}</h1>
                    <p className="podcast-desc">{data.description}</p>

                    <div className="stats-grid">
                        <div className="stat">
                            <h4>Genres</h4>
                            <p>
                                {Array.isArray(data.genres)
                                    ? data.genres.join(", ")
                                    : data.genres}
                            </p>
                        </div>
                        <div className="stat">
                            <h4>Last updated</h4>
                            <p>{formatDate(data.updated)}</p>
                        </div>
                        <div className="stat">
                            <h4>Total seasons</h4>
                            <p>{seasons.length}</p>
                        </div>
                        <div className="stat">
                            <h4>Total episodes</h4>
                            <p>{getTotalEpisodes()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seasons selector (optional) */}
            {seasons.length > 0 && (
                <div className="season-select">
                    <label>Choose season:</label>
                    <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(e.target.value)}>
                        {seasons.map((s) => (
                            <option key={s.season} value={s.season}>
                                {s.title || `Season ${s.season}`}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Seasons and episodes */}
            <div className="seasons-list">
                {seasons.map((season) => (
                    <div key={season.season} className="season-card">
                        <div className="season-poster">
                            {season.image && (
                                <img src={season.image} alt={season.title} />
                            )}
                        </div>
                        <div className="season-body">
                            <h3 className="season-title">
                                {season.title || `Season ${season.season}`}
                            </h3>
                            <p className="season-desc">{season.description}</p>

                            <div className="episodes">
                                {(season.episodes || []).map((ep, idx) => (
                                    <div
                                        key={ep.episode || idx}
                                        className={`episode-card ${
                                            String(season.season) ===
                                            String(selectedSeason)
                                                ? "active"
                                                : ""
                                        }`}>
                                        {season.image && (
                                            <div className="episode-thumb">
                                                <img
                                                    src={season.image}
                                                    alt={`${ep.title} thumb`}
                                                />
                                            </div>
                                        )}
                                        <div className="episode-info">
                                            <div className="episode-title">
                                                Episode {ep.episode}: {ep.title}
                                            </div>
                                            <div className="episode-desc">
                                                {ep.description}
                                            </div>
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
