import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashBoard } from "../components/dashboard/DashBoard";
import { RoomsDash } from "../components/dashboard/Rooms";
import { UsersDash } from "../components/dashboard/Users";
import { ReservationsDash } from "../components/dashboard/Reservations";
import { RestaurantDash } from "../components/dashboard/Restaurant";
import { ClubHouseDash } from "../components/dashboard/ClubHouse";
import { NewsDash } from "../components/dashboard/News";
import { ReviewsDash } from "../components/dashboard/Reviews";
import { ContactsDash } from "../components/dashboard/Contacts";
import { FAQsDash } from "../components/dashboard/FAQs";

export function DashBoardRoutes() {
    return (
      <Routes>
        <Route path="" element={<DashBoard />} />
  
        <Route path="rooms" element={<RoomsDash />} />

        <Route path="users" element={<UsersDash />} />

        <Route path="reservations" element={<ReservationsDash />} /> 
  
        <Route path="restaurant" element={<RestaurantDash />} />

        <Route path="clubhouse" element={<ClubHouseDash />} />

        <Route path="news" element={ <NewsDash />} />

        <Route path="reviews" element={<ReviewsDash />} />

        <Route path="contacts" element={<ContactsDash/>} />

        <Route path="faqs" element={< FAQsDash/>} />

        <Route path="*" element={<h1>Not Found</h1>} />


      </Routes>
    );
  }