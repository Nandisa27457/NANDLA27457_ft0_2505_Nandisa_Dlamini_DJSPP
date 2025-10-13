import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <h2>Home</h2>
            <h2><Link to="/favourites">Favourites</Link></h2>
        </div>
    );
}