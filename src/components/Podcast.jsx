/**
 * @file Podcast component for displaying individual podcast cards.
 * @module Podcast
 */

import React, { Component } from 'react'; // Import React and Component (though functional component is used)
import {Link} from 'react-router-dom'; // Import Link for navigation
// import { getGenres } from '../utility'; // Commented out import for getGenres utility function
import { formatDate } from '../utility'; // Import formatDate utility function

/**
 * Podcast functional component displays a single podcast card with its details.
 * When clicked, it navigates to the podcast's detail page.
 *
 * @param {object} podcast - The podcast object containing details to display.
 * @param {string} podcast.id - The unique identifier of the podcast.
 * @param {string} podcast.image - The URL of the podcast's image.
 * @param {string} podcast.title - The title of the podcast.
 * @param {string} podcast.genres - The genres associated with the podcast.
 * @param {number} podcast.seasons - The number of seasons the podcast has.
 * @param {string} podcast.updated - The last updated date of the podcast.
 * @returns {JSX.Element} A Link component wrapping a div that displays podcast information.
 */
const Podcast = (podcast) => {

// Render podcast details including image, title, genres, seasons, and updated date.
    return (
        // Link to the individual podcast detail page, preserving text decoration and color
        <Link to={`/podcast/${podcast.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="podcast-card"> {/* Container for a single podcast card */}
            <img src={podcast.image} alt="logo" width="60px" /> {/* Podcast image */}
            <h3>{podcast.title}</h3> {/* Podcast title */}
            <p>{podcast.genres}</p> {/* Podcast genres */}
            <p>{podcast.seasons} seasons</p> {/* Number of seasons */}
            <p>Updated date: {formatDate(podcast.updated)}</p> {/* Formatted updated date */}
        </div> 
        </Link>
    );
}

export default Podcast; // Export the Podcast component as default
