import React from "react";
import {Link} from "react-router-dom"

export default function FavouritesPage() {
	return (
		<div>
            <h2><Link to="/">Home</Link></h2>
			<h2>Favourites</h2>
			<p>This is your Favourites page.</p>
		</div>
	);
}
