/**
 * @file RecommendedShows component displays a carousel of recommended podcasts.
 * @module RecommendedShows
 */

import React, { useEffect, useState } from "react"; // Import React hooks
import Slider from "react-slick"; // Import Slider component from react-slick
import Podcast from "./Podcast"; // Import the Podcast component
import { fetchPodcasts } from "../utility"; // Import utility function to fetch podcasts
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme CSS

/**
 * RecommendedShows component fetches a list of podcasts and displays the top 10
 * in a responsive carousel using react-slick.
 * @returns {JSX.Element} The RecommendedShows component.
 */
export default function RecommendedShows() {
    const [topPodcasts, setTopPodcasts] = useState([]); // State to store the top podcasts
    const [loading, setLoading] = useState(true); // State to manage loading status

    // useEffect hook to fetch podcasts when the component mounts
    useEffect(() => {
        /**
         * Asynchronously fetches podcast data and sets the top 10 podcasts.
         */
        async function getPodcasts() {
            const data = await fetchPodcasts(); // Fetch all podcast data
            setTopPodcasts(data.slice(0, 10)); // Take the first 10 podcasts as "top"
            setLoading(false); // Set loading to false after data is fetched
        }
        getPodcasts(); // Call the function to fetch podcasts
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Configuration settings for the react-slick carousel
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Enable infinite looping
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 3, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll per action
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Autoplay interval in milliseconds
        centerMode: true, // Enable center mode for a focused slide
        centerPadding: "60px 0px 60px 0px", // Padding around the center slide
    };

    return (
        <div style={{ width: "100vw" }}> {/* Main container for recommended shows, full viewport width */}
            <h2 className="recommended-heading">Recommended Shows</h2> {/* Heading for the section */}
            {loading ? ( // Conditional rendering based on loading state
                <p>Loading...</p> // Display loading message
            ) : (
                <div className="carousel-strip"> {/* Container for the carousel */}
                    <Slider {...settings}> {/* Render the Slider component with defined settings */}
                        {topPodcasts.map((podcast) => ( // Map through the top podcasts
                            <Podcast key={podcast.id} {...podcast} /> // Render a Podcast component for each
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
}
