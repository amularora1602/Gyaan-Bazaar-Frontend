// import React from "react";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import "./Mart.css";

// const Mart = () => {
//   return (
//     <section className="mart">
//       <div className="mart-bg"></div>
//       <div className="mart-content">
//         <h2>Explore Our Mart</h2>
//         <p>Find amazing products and deals curated just for you.</p>
//         <button className="explore-mart-btn">Explore Mart  <FaLongArrowAltRight /></button>
//       </div>
//       <div className="mart-image">
//         <img src="../images/side.png" alt="Mart" />
//       </div>
//     </section>
//   );
// };

// export default Mart;

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import { FaLongArrowAltRight } from "react-icons/fa";
import "./Mart.css";

const Mart = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleExploreClick = () => {
    navigate("/unimart"); // Navigate to the /unimart page
  };

  return (
    <section className="mart">
      <div className="mart-bg"></div>
      <div className="mart-content">
        <h2>Explore Our Mart</h2>
        <p>Find amazing products and deals curated just for you.</p>
        <button 
          className="explore-mart-btn" 
          onClick={handleExploreClick} // Attach the navigation function to the button
        >
          Explore Mart <FaLongArrowAltRight />
        </button>
      </div>
      <div className="mart-image">
        <img src="../images/side.png" alt="Mart" />
      </div>
    </section>
  );
};

export default Mart;
