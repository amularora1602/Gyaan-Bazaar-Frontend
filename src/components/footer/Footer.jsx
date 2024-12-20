// import React from "react";
// import "./footer.css";

// const Footer = () => {
//   return (
//     <>
//       <section className='newsletter'>
//         <div className='container flexSB'>
//           <div className='left'>
//             <h1>Stay Tuned for the Latest Updates</h1>
//             <span>Get all the updates and insights from GyaanBazaar</span>
//           </div>
//           <div className='right'>
//             <input type='text' placeholder='Enter email address' />
//             <button className='subscribe-btn'>
//               <i className='fa fa-paper-plane'></i>
//             </button>
//           </div>
//         </div>
//       </section>
//       <footer>
//         <div className='container grid'>
//           <div className='box logo'>
//             <h1>GYAANBAZAAR</h1>
//             <span>CONNECTING MINDS, TRANSFORMING FUTURES</span>
//             <p>Your go-to platform for learning, growth, and connection.</p>
//             <div className='social-icons'>
//               <i className='fab fa-facebook-f icon'></i>
//               <i className='fab fa-twitter icon'></i>
//               <i className='fab fa-instagram icon'></i>
//             </div>
//           </div>
//           <div className='box'>
//             <h3>Explore</h3>
//             <ul>
//               <li>About Us</li>
//               <li>Services</li>
//               <li>Events</li>
//               <li>Blog</li>
//               <li>Contact Us</li>
//             </ul>
//           </div>
//           <div className='box'>
//             <h3>Quick Links</h3>
//             <ul>
//               <li>Contact Us</li>
//               <li>Pricing</li>
//               <li>Terms & Conditions</li>
//               <li>Privacy Policy</li>
//               <li>Feedback</li>
//             </ul>
//           </div>
//           <div className='box'>
//             <h3>Have Questions?</h3>
//             <ul>
//               <li>
//                 <i className='fa fa-map'></i> 123 Knowledge Street, Tech City, Innovation State, 45678
//               </li>
//               <li>
//                 <i className='fa fa-phone-alt'></i> +1 234 567 8901
//               </li>
//               <li>
//                 <i className='fa fa-paper-plane'></i> support@gyaanbazaar.com
//               </li>
//             </ul>
//           </div>
//         </div>
//       </footer>
//       <div className='legal'>
//         <p>Made with <i className='fa fa-heart'></i> by GyaanBazaar Team</p>
//       </div>
//     </>
//   );
// };

// export default Footer;



import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Perform API call to submit email
    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setEmail(""); // Clear the input field after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <section className="newsletter">
        <div className="container flexSB">
          <div className="left">
            <h1>Stay Tuned for the Latest Updates</h1>
            <span>Get all the updates and insights from GyaanBazaar</span>
          </div>
          <div className="right">
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="subscribe-btn">
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <div className="container grid">
          <div className="box logo">
            <h1>GYAANBAZAAR</h1>
            <span>CONNECTING MINDS, TRANSFORMING FUTURES</span>
            <p>Your go-to platform for learning, growth, and connection.</p>
            <div className="social-icons">
              <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-twitter icon"></i>
              <i className="fab fa-instagram icon"></i>
            </div>
          </div>
          <div className="box">
            <h3>Explore</h3>
            <ul>
              <li><a href="/about-container">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="box">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/feedback">Feedback</a></li>
            </ul>
          </div>
          <div className="box">
            <h3>Have Questions?</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i> 123 Knowledge Street, Tech City, Innovation State, 45678
              </li>
              <li>
                <i className="fa fa-phone-alt"></i> 
                <a href="tel:+12345678901">+1 234 567 8901</a>
              </li>
              <li>
                <i className="fa fa-paper-plane"></i> support@gyaanbazaar.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>Made with <i className="fa fa-heart"></i> by GyaanBazaar Team</p>
      </div>
    </>
  );
};

export default Footer;
