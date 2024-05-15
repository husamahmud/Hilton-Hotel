import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Aside from "../Aside/Aside";
import Home from "../Home/Home";
import About from "../About/About";
import Footer from "../Footer/Footer";
// import {Login} from "../Login/Login";
// import {SignUp} from "../SignUp/SignUp";

import "./Main.css";

const links = [
  {path: "/", title: "Home", component: Home},
  {path: "/about", title: "About", component: About},
  // {path: "/auth/login", title: "Login", component: Login},
  // {path: "/auth/register", title: "Signup", component: SignUp},
  // {path: "/rooms", title: "Rooms & Suites", component: "Rooms"},
  // {path: "/restaurant", title: "Restaurant", component: "Restaurant"},
  // {path: "/spa", title: "Spa Center", component: "Spa"},
  // TODO Pages, News
  // {path: "/contact", title: "Contacts", component: "Contact"},
];

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="main">
      <Aside links={links}
             isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "open" : ""}`}>
        <div className="page">
          <div className={`nav-toggle ${isOpen ? "open" : ""}`}>
            <input
              className="checkbox"
              type="checkbox"
              checked={isOpen}
              onChange={handleOpenToggle}
            />
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