import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { formatDate } from '../utility';



const RecommendedPodcast = (podcast) => {

// Render podcast details including image, title, genres, seasons, and updated date.
    return (
        <Link to={`/podcast/${podcast.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="podcast-card">
            <img src={podcast.image} alt="logo" width="60px" />
            <h3>{podcast.title}</h3>
            <p>{podcast.genres}</p>
            <p>{podcast.seasons} seasons</p>
            <p>Updated date: {formatDate(podcast.updated)}</p>
        </div> 
        </Link>
    );
}


export default RecommendedPodcast;