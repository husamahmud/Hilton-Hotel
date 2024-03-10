import { Outlet, Navigate } from "react-router-dom";

export function AdminRoutes() {
  const token = !!localStorage.getItem("token");
  const adminRrole = localStorage.getItem("role") === "admin";

  return token && adminRrole ? <Outlet /> : <Navigate to="/error/notfound" />;
}

// for Add => reservation, restaurant, clubhouse, news, reviews
export function UserRoutes() {
  const token = !!localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/auth/login" />;
}
