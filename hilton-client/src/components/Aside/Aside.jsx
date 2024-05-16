import {useNavigate} from "react-router-dom";
import Star from "../Constant/Star";

export default function Aside({links, isOpen}) {
  const navigate = useNavigate();

  return (
    <aside className={`${isOpen ? "asideOpen" : ""}`}>
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
          {!localStorage.getItem("token") ? (
              <div>
                <li>
                  <button onClick={() => navigate("/auth/login")}>
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/auth/register")}>
                    SignUp
                  </button>
                </li>
              </div>

            ) :
            JSON.parse(localStorage.getItem("user")).role === "ADMIN" ? (
              <div>
                <li>
                  <button onClick={() => navigate("/dashboard")}>
                    Admin Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/")
                  }}>
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <>
                <li>
                  <button onClick={() => navigate("/profile")}>
                    Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/")
                  }}>
                    Logout
                  </button>
                </li>
              </>
            )}
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
