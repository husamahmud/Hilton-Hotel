import {useNavigate} from "react-router-dom";
import "./Footer.css"

export default function Footer() {
	const navigate = useNavigate();

	return (
		<footer>
			<div className="about-hotel">
				<h3>About Hotel</h3>
				<p>Welcome to the best five-star deluxe hotel in New York. Hotel
				   elementum sesue the aucan ivestane aliquam usto in the sapien
				   rutrum.</p>
			</div>
			<div className="about-explore">
				<h3>Explore</h3>

				<div className="links">
					<ul>
						<li>
							<button onClick={() => navigate("/")}>Home</button>
						</li>
						<li>
							<button onClick={() => navigate("/rooms")}>Rooms & Suites</button>
						</li>
						<li>
							<button onClick={() => navigate("/restaurant")}>Restaurant</button>
						</li>
						<li>
							<button onClick={() => navigate("/spa")}>Spa Center</button>
						</li>
						<li>
							<button onClick={() => navigate("/about")}>About Hotel</button>
						</li>
						<li>
							<button onClick={() => navigate("/contact")}>Contact</button>
						</li>
					</ul>
				</div>
			</div>

			<div className="about-contact">
				<h3>Contact</h3>
				<p>
					1616 Broadway NY, New York 10001
					United States of America
				</p>
				<div className="phone">
					<span className="material-symbols-outlined icon">phone_in_talk</span>
					<span className="text">
						<a href="tel:1-800-123-4567">1-800-123-4567</a>
					</span>
				</div>
				<a href="mailto:hiltonhotel.organization@gmail.com"
				   className="email">
					hiltonhotel.organization@gmail.com
				</a>
				<div className="social-icons">
					<a href="#">
						<img src="facebook.svg"
						     alt="facebook" />
					</a>
					<a href="#">
						<img src="instagram.svg"
						     alt="instagram" />
					</a>
					<a href="#">
						<img src="twitter.svg"
						     alt="twitter" />
					</a>
					<a href="#">
						<img src="youtube.svg"
						     alt="youtube" />
					</a>
				</div>
			</div>
		</footer>
	);
}
