import React from "react";

const PodcastControls = ({
    //props for control states and setters
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedGenre,
    setSelectedGenre,
}) => {
    return (
        <div className="podcast-controls">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search podcasts..."
                value={searchQuery} //search state
                onChange={(e) => setSearchQuery(e.target.value)} //update search state on input
            />
        </div>
    );
};

export default PodcastControls;
