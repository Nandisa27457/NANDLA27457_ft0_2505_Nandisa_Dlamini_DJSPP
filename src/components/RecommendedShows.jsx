import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Podcast from "./Podcast";
import { fetchPodcasts } from "../utility";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RecommendedShows() {
    const [topPodcasts, setTopPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPodcasts() {
            const data = await fetchPodcasts();
            setTopPodcasts(data.slice(0, 10));
            setLoading(false);
        }
        getPodcasts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div style={{ margin: "30px 0" }}>
            <h2>Recommended Shows</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Slider {...settings}>
                    {topPodcasts.map((podcast) => (
                        <Podcast key={podcast.id} {...podcast} />
                    ))}
                </Slider>
            )}
        </div>
    );
}
