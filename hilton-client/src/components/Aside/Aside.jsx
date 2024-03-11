import {useNavigate} from "react-router-dom";
import Star from "../Constant/Star";

export default function Aside({links}) {
	const navigate = useNavigate();

	return (
		<aside>
			<a className="logo"
			   href="/">
				<div className="stars">
					<Star />
					<Star />
					<Star />
					<Star />
					<Star />
				</div>
				<h2>Hilton Hotel</h2>
				<span>Luxury Hotel</span>
			</a>

			<nav>
				<ul>
					{links.map(link => (
						<li key={link.path}>
							<button onClick={() => navigate(link.path)}>
								{link.title}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<div className="reservation">
				<span className="material-symbols-outlined icon">phone_in_talk</span>
				<span className="text">
					<p>Reservation</p>
					<a href="tel:1-800-123-4567">1-800-123-4567</a>
				</span>
			</div>
		</aside>
	);
}
