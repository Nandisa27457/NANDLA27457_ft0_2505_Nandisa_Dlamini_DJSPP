import SideBar from "../components/Sidebar";
import Header from "../components/Header";
import Podcasts from "../components/Podcasts";
import RecommendedShows from "../components/RecommendedShows";
import "../HomePage.css";

export default function HomePage() {
    return (
        <>
            <Header />
            <SideBar />
            <RecommendedShows />
            <Podcasts />
        </>
    );
}
