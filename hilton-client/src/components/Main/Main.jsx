import {Route, Routes} from "react-router-dom";
import Aside from "../Aside/Aside";
import Home from "../Home/Home";
import About from "../About/About";
import Footer from "../Footer/Footer";
import "./Main.css"
import "normalize.css"

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
	return (
		<div className="main">
			<Aside links={links} />

			<div className="main-content">
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

				<Footer />
			</div>
		</div>
	);
}
