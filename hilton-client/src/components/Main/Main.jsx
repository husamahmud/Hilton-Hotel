import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Aside from "../Aside/Aside";
import Home from "../Home/Home";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css"
import "normalize.css"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MzQ3ZjdkLTc1ZWEtNDczMy1hOGEzLTNjNzg0OTZjZWU3MSIsImVtYWlsIjoia2ZhdHRlbUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTAxMjg4NTIsImV4cCI6MTcxMDM4ODA1Mn0.pU7WqJhhRk-W-ztKN69fTkJoaX-9LKR1J2xXpV6ew3U"

const links = [
	{path: "/", title: "Home", component: Home},
	{path: "/about", title: "About", component: About},
	{path: "/rooms", title: "Rooms & Suites", component: "Rooms"},
	{path: "/restaurant", title: "Restaurant", component: "Restaurant"},
	{path: "/spa", title: "Spa Center", component: "Spa"},
	// TODO Pages, News
	{path: "/contact", title: "Contacts", component: "Contact"},
];

export default function Main() {
	const [isOpen, setIsOpen] = useState(false);

	function handleOpenToggle() {
		setIsOpen(!isOpen)
	}

	return (
		<div className="main">
			<Aside links={links}
			       isOpen={isOpen} />

			<div className={`main-content ${isOpen ? "open" : ""}`}>
				<div className="page">
					<div className={`nav-toggle ${isOpen ? "open" : ""}`}>
						<input className="checkbox"
						       type="checkbox"
						       checked={isOpen}
						       onChange={handleOpenToggle} />
						<svg fill="none"
						     viewBox="0 0 50 50"
						     height="30"
						     width="30">
							<path
								className="lineTop line"
								strokeLinecap="round"
								strokeWidth="4"
								stroke="black"
								d="M6 11L44 11"
							/>
							<path
								strokeLinecap="round"
								strokeWidth="4"
								stroke="black"
								d="M6 24H43"
								className="lineMid line"
							/>
							<path
								strokeLinecap="round"
								strokeWidth="4"
								stroke="black"
								d="M6 37H43"
								className="lineBottom line"
							/>
						</svg>
					</div>
					<Routes>
						<Route path="/"
						       element={<Home />} />
						<Route path="/about"
						       element={<About />} />
						<Route path="/rooms"
						       element={<h1>Rooms</h1>} />
						<Route path="/restaurant"
						       element={<h1>Restaurant</h1>} />
						<Route path="/spa"
						       element={<h1>Spa</h1>} />
						<Route path="/contact"
						       element={<h1>Contact</h1>} />
					</Routes>
				</div>
				<Footer />
			</div>
		</div>
	);
}


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
