import Star from "../Constant/Star";

export default function Home() {

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
				<button>Rooms & Suites</button>
			</div>
		</div>
	)
}
