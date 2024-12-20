import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/home/home";
import Login from "./components/login/Login";
import Profile from "./components/profile/profile";
import Book from "./components/booknest/book";
import SubSubjects from "./components/booknest/subSubjects";
import CourseBooks from "./components/booknest/courseBooks";
import { UserContext } from "./components/userContext";
import EventPage from "./components/Event/EventPage";
import EventDetails from "./components/Event/viewDetails/EventDetails";
import About from "./components/about/About";
import Contact from "./components/contact/ContactUs";
import Unimart from "./components/unimart/unimart";
import Cart from "./components/unimart/Cart";
import Dashboard from "./components/Dashboard";

// Admin-Specific Components
// import MainDash from "./components/MainDash/MainDash";
// import Sidebar from "./components/Sidebar";
import CheckoutPage from "./components/Paymentpage";
// import UpcomingEventUser from "./components/EventUser";
import EventDetailsAdmin from "./components/AdminEventDetails";



function App() {
  const [user, setUser] = useState(null);

  // A function to check user authentication and role
  const isAuthenticated = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parse the user object from localStorage
      const userRole = parsedUser.user_role; // Access the role from the user object
      return userRole === "User" ? "User" : userRole === "Admin" ? "Admin" : false;
    }
    return false;
  };

  useEffect(() => {
    // Set the user from localStorage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* Login Route (Redirects authenticated users based on role) */}
          <Route
            path="/"
            element={
              isAuthenticated() === "User" ? (
                <Navigate to="/home" />
              ) : isAuthenticated() === "Admin" ? (
                <Navigate to="/Dashboard" />
              ) : (
                <Login />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              isAuthenticated() ? (
                <Routes>
                  {/* Common Routes */}
                  {isAuthenticated() === "User" && (
                    <>
                      <Route path="/home" element={<Home />} />
                      <Route path="/event" element={<EventPage />} />
                      <Route path="/event/:id" element={<EventDetails />} />
                      <Route path="/about-container" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/unimart" element={<Unimart />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/book" element={<Book />} />
                      <Route path="/subsubjects/:id" element={<SubSubjects />} />
                      <Route path="/courseBooks" element={<CourseBooks />} />
                      <Route path="/payment" element={< CheckoutPage/>} />
                    </>
                  )}
                  {isAuthenticated() === "Admin" && (
                    <>
                      <Route path="/Dashboard" element={<Dashboard />} />
                      <Route path="/event/:id" element={<EventDetailsAdmin />} />
                    </>
                  )}
                </Routes>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
