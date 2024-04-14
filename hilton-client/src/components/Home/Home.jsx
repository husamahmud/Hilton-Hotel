// import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Star from "../Constant/Star";

// const TOKEN =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MzQ3ZjdkLTc1ZWEtNDczMy1hOGEzLTNjNzg0OTZjZWU3MSIsImVtYWlsIjoia2ZhdHRlbUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTAxMjg4NTIsImV4cCI6MTcxMDM4ODA1Mn0.pU7WqJhhRk-W-ztKN69fTkJoaX-9LKR1J2xXpV6ew3U";

export default function Home() {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	fetch("http://localhost:3000/api/v1/sliders", {
	// 		headers: {
	// 			"Authorization": `Bearer ${TOKEN}`
	// 		}
	// 	})
	// 		.then(res => {
	// 			if (!res.ok) throw new Error(`HTTP error ${res.status}`)
	// 			return res.json()
	// 		})
	// 		.then(data => console.log(data))
	// 		.catch(err => console.error(err))
	// }, []);

	return (
		<div className="home">
			<section className="hero">
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
			</section>
			<section className="about">
				<div className="container">
					<div className="desc">
						<div className="stars">
							<Star />
							<Star />
							<Star />
							<Star />
							<Star />
						</div>

						<p className="name">Hilton Luxury Hotel</p>
						<h2>Enjoy a Luxury Experience</h2>
						<p className="text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
						</p>
					</div>
					<div className="imgs">
						<div className="special">
							<img src="1.jpg"
							     alt="" />
						</div>
						<div>
							<img src="2.jpg"
							     alt="" />
						</div>
					</div>
				</div>
			</section>

			<section className="rooms">
				<div className="desc">
					<p className="name">Hilton Luxury Hotel</p>
					<h2>Enjoy a Luxury Experience</h2>
				</div>

				<div className="container">
					<div className="col">
						<div className="item">
							<div className="img">
								<img src="5.jpg"
								     alt="" />
							</div>

							<span className="category">
									<a href="/">Book</a>
								</span>

							<div className="con">
								<div className="text">
									<h6>150$ / NIGHT</h6>
									<a href="/"
									   className="room">Junior Suite</a>
									<div className="line"></div>
								</div>

								<div className="row">
									<div className="services">
										<img src="bed-50.png"
										     alt="" />
										<img src="bathroom-50.png"
										     alt="" />
										<img src="blankie-50.png"
										     alt="" />
										<img src="refreshments-50.png"
										     alt="" />
									</div>

									<div className="details">
										<a href="/">Details</a>
										<span className="material-symbols-rounded">arrow_forward</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col">
						<div className="item">
							<div className="img">
								<img src="6.jpg"
								     alt="" />
							</div>

							<span className="category">
									<a href="/">Book</a>
								</span>

							<div className="con">
								<div className="text">
									<h6>150$ / NIGHT</h6>
									<a href="/"
									   className="room">Junior Suite</a>
									<div className="line"></div>
								</div>

								<div className="row">
									<div className="services">
										<img src="bed-50.png"
										     alt="" />
										<img src="bathroom-50.png"
										     alt="" />
										<img src="blankie-50.png"
										     alt="" />
										<img src="refreshments-50.png"
										     alt="" />
									</div>

									<div className="details">
										<a href="/">Details</a>
										<span className="material-symbols-rounded">arrow_forward</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col">
						<div className="item">
							<div className="img">
								<img src="7.jpg"
								     alt="" />
							</div>

							<span className="category">
									<a href="/">Book</a>
								</span>

							<div className="con">
								<div className="text">
									<h6>150$ / NIGHT</h6>
									<a href="/"
									   className="room">Junior Suite</a>
									<div className="line"></div>
								</div>

								<div className="row">
									<div className="services">
										<img src="bed-50.png"
										     alt="" />
										<img src="bathroom-50.png"
										     alt="" />
										<img src="blankie-50.png"
										     alt="" />
										<img src="refreshments-50.png"
										     alt="" />
									</div>

									<div className="details">
										<a href="/">Details</a>
										<span className="material-symbols-rounded">arrow_forward</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="services">
				<div className="container">
					<div className="desc">
						<p className="name">Best Prices</p>
						<h2>Extra Services</h2>
						<p>
							The best prices for your relaxing vacation. The utanislen quam
							nestibulum ac quame odion elementum sceisue the aucan.
						</p>
						<div className="reservation">
							<span className="material-symbols-outlined icon">phone_in_talk</span>
							<span className="text">
								<p>Reservation</p>
								<a href="tel:1-800-123-4567">1-800-123-4567</a>
							</span>
						</div>
					</div>

					<div className="cards">
						<div className="card">
							<div className="img">
								<img src="8.jpg"
								     alt="" />
							</div>
							<div className="info">
								<h4>Safe & Secure</h4>

								<div className="amount">
									$15 <span>/daily</span>
								</div>

								<ul>
									<li>
										<span className="material-symbols-rounded">done</span>
										Hotel ut nisan the duru
									</li>
									<li>
										<span className="material-symbols-rounded">done</span>
										Orci miss natoque vasa ince
									</li>
									<li>
										<span className="material-symbols-rounded false">close</span>
										Clean sorem ipsum morbin
									</li>
								</ul>
							</div>
						</div>

						<div className="card">
							<div className="img">
								<img src="9.jpg"
								     alt="" />
							</div>
							<div className="info">
								<h4>Room & cleaning</h4>

								<div className="amount">
									$50 <span>/month</span>
								</div>

								<ul>
									<li>
										<span className="material-symbols-rounded">done</span>
										Hotel ut nisan the duru
									</li>
									<li>
										<span className="material-symbols-rounded">done</span>
										Orci miss natoque vasa ince
									</li>
									<li>
										<span className="material-symbols-rounded false">close</span>
										Clean sorem ipsum morbin
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="testimonials">
				<div className="background"></div>
				<div className="container">
					<div className="row">
						<div className="desc">
							<div className="stars">
								<Star />
								<Star />
								<Star />
								<Star />
								<Star />
							</div>
							<p className="text">
								Each of our guest rooms feature a private
								bath, wi-fi, cable
								television and include full breakfast.
							</p>
							<div className="reservation">
								<span className="material-symbols-outlined icon">phone_in_talk</span>
								<span className="text">
								<p>Reservation</p>
								<a href="tel:1-800-123-4567">1-800-123-4567</a>
							</span>
							</div>
							<p className="callus">
								<span className="material-symbols-rounded">done</span>
								Call us, it's toll-free.
							</p>
						</div>

						<div className="form">
							<div className="head-box">
								<p className="name">Hilton Luxury Hotel</p>
								<h2>Enjoy a Luxury Experience</h2>
							</div>
							<div className="booking">
								<form>
									<div className="group">
										<label>Check in</label>
										<input type="date"
										       placeholder="Check in" />
									</div>
									<div className="group">
										<label>Check out</label>
										<input type="date"
										       placeholder="Check in" />
									</div>
									<div>
										<select>
											<option>Adults</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
										</select>
										<select>
											<option>Children</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
										</select>
									</div>
									<button>Check Availability</button>
								</form>
							</div>
						</div>
					</div>
					<div className="row-bg"></div>
				</div>
			</section>
		</div>
	);
}
