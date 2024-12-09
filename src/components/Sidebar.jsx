


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import "./Styles/Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const [showPopupEvent, setShowPopupEvent] = useState(false);
  const [showPopupProduct, setShowPopupProduct] = useState(false);
  const [showPopupUser, setShowPopupUser] = useState(false); // For User Popup
  const [events, setEvents] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's navigation hook

  const toggleSidebar = () => {
    setExpaned((prev) => !prev);
  };

  // Fetch Events
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch event data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch product data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (index, heading) => {
    setSelected(index);
    if (heading === "Users") {
      setShowPopupUser(true);
      fetchUsers();
    } else if (heading === "Events") {
      setShowPopupEvent(true);
      fetchEvents();
    } else if (heading === "Products") {
      setShowPopupProduct(true);
      fetchProducts();
    }
  };

  const closePopup = () => {
    setShowPopupUser(false);
    setShowPopupEvent(false);
    setShowPopupProduct(false);
  };

  const handleSignOut = () => {
    navigate("/"); // Redirect to the login page
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={toggleSidebar}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        animate={isMobile ? `${expanded}` : ""}
        transition={{ duration: 0.3 }}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Gyaan<span>B</span>azaar
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => handleItemClick(index, item.heading)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}
          <div className="menuItem" onClick={handleSignOut}>
            <UilSignOutAlt />
            <span>Sign Out</span>
          </div>
        </div>
      </motion.div>

      {/* Popup for Users */}
      {showPopupUser && (
        <div className="popup">
          <div className="popup-content">
            <h2>Registered Users</h2>
            <button className="close-popup" onClick={closePopup}>
              X
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.user_name}</td>
                      <td>{user.user_email}</td>
                      <td>{user.user_mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Popup for Events */}
      {showPopupEvent && (
        <div className="popup">
          <div className="popup-content">
            <h2>Event List</h2>
            <button className="close-popup" onClick={closePopup}>
              X
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>{event.eventName}</td>
                      <td>{event.eventDate}</td>
                      <td>{event.eventDescription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Popup for Products */}
      {showPopupProduct && (
        <div className="popup">
          <div className="popup-content">
            <h2>Product List</h2>
            <button className="close-popup" onClick={closePopup}>
              X
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.productName}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Add Product Button */}
      {showPopupProduct && (
        <div className="add-product-btn">
          <button onClick={() => navigate("/add-product")}>Add Product</button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
