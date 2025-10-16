import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import Header from "../components/Header";
import Podcasts from "../components/Podcasts";
import RecommendedShows from "../components/RecommendedShows";
import "../HomePage.css";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("date-desc");

    return (
        <>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                isFavouritesPage={false}
            />
            <SideBar />
            <RecommendedShows />
            <Podcasts
                searchQuery={searchQuery}
                sortBy={sortBy}
            />
        </>
    );
}
