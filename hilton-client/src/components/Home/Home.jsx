import Star from "../Constant/Star";
import {useNavigate} from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="home">
			<div className="stars">
				<Star />
				<Star />
				<Star />
				<Star />
				<Star />
			</div>

			<div className="welcome-text">
				<p>Unique Place to Relax & Enjoy</p>
				<h1>Enjoy a Luxury Experience</h1>
				<button onClick={() => navigate("/rooms")}>Rooms & Suites</button>
			</div>
		</div>
	)
}
