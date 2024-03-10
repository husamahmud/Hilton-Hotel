import React from "react";
import "./dashboard.css";

export function Aside() {

    const currentUrl = window.location.href;

    return (
        <aside className="dashboard_aside">
            <div className="dashboard_aside_container">
                <div className="dashboard_aside_container_header">
                    <h3>Admin Dashboard</h3>
                </div>
                <div className="dashboard__aside__container__menu">
                    <ul>
                        <li className={currentUrl === "http://localhost:3000/dashboard"? "active" : ""}><a href="/dashboard">Dashboard</a></li>
                        <li className={currentUrl.includes('users')? "active": ""} ><a href="/dashboard/users">Users</a></li>
                        <li className={currentUrl.includes('rooms')? "active": ""} ><a href="/dashboard/rooms">Rooms</a></li>
                        <li className={currentUrl.includes('reservations')? "active": ""} ><a href="/dashboard/reservations">Reservations</a></li>
                        <li className={currentUrl.includes('restaurant')? "active": ""}><a href="/dashboard/restaurant">Restaurant</a></li>
                        <li className={currentUrl.includes('clubhouse')? "active": ""}><a href="/dashboard/clubhouse"> ClubHouse </a> </li>
                        <li className={currentUrl.includes('news')? "active": ""}><a href="/dashboard/news"> News </a> </li>
                        <li className={currentUrl.includes('reviews')? "active": ""} ><a href="/dashboard/reviews"> Reviews </a> </li>
                        <li className={currentUrl.includes('contacts')? "active": ""}><a href="/dashboard/contacts"> Contacts </a> </li>
                        <li className={currentUrl.includes('faqs')? "active": ""}><a href="/dashboard/faqs"> FAQs </a> </li>
                        <li><a href="/"> Home </a> </li>
            </ul>
                </div>
            </div>
        </aside>

    )
}