import { Outlet, Navigate } from "react-router-dom";

export function AdminRoutes() {
  const token = !!localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const adminRole = user && JSON.parse(user).role === "ADMIN";

  return token && adminRole ? <Outlet /> : <Navigate to="/error/notfound" />;
}

// for Add => reservation, restaurant, clubhouse, news, reviews
export function UserRoutes() {
  const token = !!localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/auth/login" />;
}

