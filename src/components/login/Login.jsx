// import React, { useState, useContext } from "react";
// import {
//   FaUser,
//   FaLock,
//   FaFacebook,
//   FaTwitter,
//   FaGoogle,
//   FaLinkedinIn,
//   FaEnvelope,
//   FaPhone,
//   FaEye,
//   FaEyeSlash
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../userContext"; // Ensure this is correctly imported
// import "./LogSig.css";

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     user_name: "",
//     user_email: "",
//     user_password: "",
//     user_mobile: "",
//     user_dob: "",
//     user_role: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);

//   const handleSignUpClick = () => {
//     setIsSignUp(true);
//     setErrors({});
//   };

//   const handleSignInClick = () => {
//     setIsSignUp(false);
//     setErrors({});
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validatePassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phoneNumber);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|[a-z0-9.-]+\.[a-z]{2,3})$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSignUp) {
//       // Validate input fields for sign up
//       if (!validatePassword(formData.user_password)) {
//         setErrors({
//           general:
//             "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.",
//         });
//         return;
//       }
//       if (!validatePhoneNumber(formData.user_mobile)) {
//         setErrors({
//           general: "Phone number must consist of exactly 10 digits.",
//         });
//         return;
//       }
//       if (!validateEmail(formData.user_email)) {
//         setErrors({
//           general: "Please enter a valid email (e.g., example@gmail.com).",
//         });
//         return;
//       }
//     }

//     try {
//       const endpoint = isSignUp
//         ? "http://localhost:3000/api/users/register"
//         : "http://localhost:3000/api/users/login";
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const contentType = response.headers.get("content-type");
//       let data;

//       if (contentType && contentType.indexOf("application/json") !== -1) {
//         data = await response.json();
//       } else {
//         data = await response.text();
//       }

//       if (response.ok) {
//         if (isSignUp) {
//           // On successful sign-up, redirect to the sign-in form
//           alert("Registration successful. Please sign in.");
//           setIsSignUp(false); // Switch to the sign-in form
//           setFormData({
//             user_name: "",
//             user_email: "",
//             user_password: "",
//             user_mobile: "",
//             user_dob: "",
//             user_role: "",
//           });
//         } else {
//           // On successful login, proceed to the profile page
//           setUser(data.data || formData); // Set user in context
//           localStorage.setItem("user", JSON.stringify(data.data || formData)); // Store in localStorage
//           alert("Login successful");
//           navigate("/home", { state: { user: data.data || formData } });
//         }
//       } else {
//         setErrors({ general: data.error || data });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrors({ general: "An error occurred. Please try again later." });
//     }
//   };

//   return (
//     <div className="login">
//       <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
//         <div className="forms-container">
//           <div className="signin-signup">
//             {/* Sign In Form */}
            
//           <form
//             onSubmit={handleSubmit}
//             className={`sign-in-form ${isSignUp ? "hidden" : ""}`}
//           >
//             <h2 className="title">Sign in</h2>
//             {errors.general && <div className="error">{errors.general}</div>}
//             <div className="input-field">
//               <i>
//                 <FaUser />
//               </i>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 name="user_name"
//                 value={formData.user_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <i>
//                 <FaUser />
//               </i>
//               <select
//                 name="user_role"
//                 value={formData.user_role}
//                 onChange={handleInputChange}
//                 required
//                 className="dropdown"
//               >
//                 <option value="" disabled>
//                   Select Role
//                 </option>
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//             <div className="input-field password-field">
//               <i>
//                 <FaLock />
//               </i>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Password"
//                 name="user_password"
//                 value={formData.user_password}
//                 onChange={handleInputChange}
//                 required
//               />
//               <i onClick={togglePasswordVisibility} className="password-eye">
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </i>
//             </div>
//             <input type="submit" value="Login" className="btn solid" />
//             <p className="social-text">Or Sign in with social platforms</p>
//             <div className="social-media">
//               <a href="https://www.facebook.com" className="social-icon">
//                 <FaFacebook />
//               </a>
//               <a href="https://www.twitter.com" className="social-icon">
//                 <FaTwitter />
//               </a>
//               <a href="https://www.google.com" className="social-icon">
//                 <FaGoogle />
//               </a>
//               <a href="https://www.linkedin.com" className="social-icon">
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </form>

//           {/* Sign Up Form */}
//           <form
//             onSubmit={handleSubmit}
//             className={`sign-up-form ${isSignUp ? "" : "hidden"}`}
//           >
//             <h2 className="title">Sign up</h2>
//             {errors.general && <div className="error">{errors.general}</div>}
//             <div className="input-field">
//               <i>
//                 <FaUser />
//               </i>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 name="user_name"
//                 value={formData.user_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <i>
//                 <FaEnvelope />
//               </i>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="user_email"
//                 value={formData.user_email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <i>
//                 <FaPhone />
//               </i>
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 name="user_mobile"
//                 value={formData.user_mobile}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="input-field">
//               <i>
//                 <FaUser />
//               </i>
//               <select
//                 name="user_role"
//                 value={formData.user_role}
//                 onChange={handleInputChange}
//                 required
//                 className="dropdown"
//               >
//                 <option value="" disabled>
//                   Select Role
//                 </option>
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//             <div className="input-field password-field">
//               <i>
//                 <FaLock />
//               </i>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Password"
//                 name="user_password"
//                 value={formData.user_password}
//                 onChange={handleInputChange}
//                 required
//               />
//               <i onClick={togglePasswordVisibility} className="password-eye">
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </i>
//             </div>
//             <input type="submit" value="Sign up" className="btn solid" />
//           </form>

//           </div>
//         </div>

//         <div className="panels-container">
//           <div className="panel left-panel">
//             <div className="content">
//               <h3>New here?</h3>
//               <p>Come let us help you enter your details!</p>
//               <button
//                 className="btn transparent"
//                 id="sign-up-btn"
//                 onClick={handleSignUpClick}
//               >
//                 Sign up
//               </button>
//             </div>
//             <img
//               src="./images/register.png"
//               className="image"
//               alt="register"
//             />
//           </div>
//           <div className="panel right-panel">
//             <div className="content">
//               <h3>Already a member?</h3>
//               <p>We are excited to welcome you back!</p>
//               <button
//                 className="btn transparent"
//                 id="sign-in-btn"
//                 onClick={handleSignInClick}
//               >
//                 Sign in
//               </button>
//             </div>
//             <img
//               src="./images/login.png"
//               className="image"
//               alt="login"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useContext } from "react";
// import {
//   FaUser,
//   FaLock,
//   FaEnvelope,
//   FaPhone,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../userContext";
// import "./LogSig.css";

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     user_name: "",
//     user_email: "",
//     user_password: "",
//     user_mobile: "",
//     user_role: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);

//   // Toggle between Sign Up and Sign In
//   const handleSignUpClick = () => {
//     setIsSignUp(true);
//     setErrors({});
//   };

//   const handleSignInClick = () => {
//     setIsSignUp(false);
//     setErrors({});
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
    

//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   // Validators for fields
//   const validatePassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);

//   const validateEmail = (email) =>
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation for Sign Up
//     if (isSignUp) {
//       if (!validatePassword(formData.user_password)) {
//         setErrors({
//           general:
//             "Password must include at least 1 uppercase, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters.",
//         });
//         return;
//       }
//       if (!validatePhoneNumber(formData.user_mobile)) {
//         setErrors({ general: "Phone number must consist of exactly 10 digits." });
//         return;
//       }
//       if (!validateEmail(formData.user_email)) {
//         setErrors({ general: "Enter a valid email (e.g., example@gmail.com)." });
//         return;
//       }
//     }

//     try {
//       const endpoint = isSignUp
//         ? "http://localhost:5000/api/users/register"
//         : "http://localhost:5000/api/users/login";
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include", // Ensure cookies are included in the request
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (isSignUp) {
//           alert("Registration successful. Please sign in.");
//           setIsSignUp(false);
//           setFormData({
//             user_name: "",
//             user_email: "",
//             user_password: "",
//             user_mobile: "",
//             user_role: "",
//           });
//         } else {
//           setUser(data.data);
//           localStorage.setItem("user", JSON.stringify(data.data));
//           alert("Login successful");

//           if (data.data.user_role === "Admin") {
//             navigate("/Dashboard");
//           } else {
//             navigate("/home", { state: { user: data.data } });
//           }
//         }
//       } else {
//         setErrors({ general: data.error || "Something went wrong." });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrors({ general: "An error occurred. Please try again later." });
//     }
//   };

//   return (
//     <div className="login">
//       <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
//         <div className="forms-container">
//           <div className="signin-signup">
//             {/* Sign In Form */}
//             <form
//               onSubmit={handleSubmit}
//               className={`sign-in-form ${isSignUp ? "hidden" : ""}`}
//             >
//               <h2 className="title">Sign in</h2>
//               {errors.general && <div className="error">{errors.general}</div>}
//               <div className="input-field">
//                 <i>
//                   <FaUser />
//                 </i>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   name="user_name"
//                   value={formData.user_name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="input-field">
//                 <i>
//                   <FaUser />
//                 </i>
//                 <select
//                   name="user_role"
//                   value={formData.user_role}
//                   onChange={handleInputChange}
//                   required
//                   className="dropdown"
//                 >
//                   <option value="" disabled>
//                     Select Role
//                   </option>
//                   <option value="User">User</option>
//                   <option value="Admin">Admin</option>
//                 </select>
//               </div>
//               <div className="input-field password-field">
//                 <i>
//                   <FaLock />
//                 </i>
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   placeholder="Password"
//                   name="user_password"
//                   value={formData.user_password}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <i onClick={togglePasswordVisibility} className="password-eye">
//                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </i>
//               </div>
//               <input type="submit" value="Login" className="btn solid" />
//             </form>

//             {/* Sign Up Form */}
//             <form
//               onSubmit={handleSubmit}
//               className={`sign-up-form ${isSignUp ? "" : "hidden"}`}
//             >
//               <h2 className="title">Sign up</h2>
//               {errors.general && <div className="error">{errors.general}</div>}
//               <div className="input-field">
//                 <i>
//                   <FaUser />
//                 </i>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   name="user_name"
//                   value={formData.user_name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="input-field">
//                 <i>
//                   <FaEnvelope />
//                 </i>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="input-field">
//                 <i>
//                   <FaPhone />
//                 </i>
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   name="user_mobile"
//                   value={formData.user_mobile}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="input-field">
//                 <i>
//                   <FaUser />
//                 </i>
//                 <select
//                   name="user_role"
//                   value={formData.user_role}
//                   onChange={handleInputChange}
//                   required
//                   className="dropdown"
//                 >
//                   <option value="" disabled>
//                     Select Role
//                   </option>
//                   <option value="User">User</option>
//                   <option value="Admin">Admin</option>
//                 </select>
//               </div>
//               <div className="input-field password-field">
//                 <i>
//                   <FaLock />
//                 </i>
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   placeholder="Password"
//                   name="user_password"
//                   value={formData.user_password}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <i onClick={togglePasswordVisibility} className="password-eye">
//                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </i>
//               </div>
//               <input type="submit" value="Sign up" className="btn solid" />
//             </form>
//           </div>
//         </div>
//         <div className="panels-container">
//           <div className="panel left-panel">
//             <div className="content">
//               <h3>New here?</h3>
//               <p>Let us help you register your account!</p>
//               <button
//                 className="btn transparent"
//                 id="sign-up-btn"
//                 onClick={handleSignUpClick}
//               >
//                 Sign up
//               </button>
//             </div>
//             <img src="./images/login.png" className="image" alt="register" />
//           </div>
//           <div className="panel right-panel">
//             <div className="content">
//               <h3>Already a member?</h3>
//               <p>We are excited to welcome you back!</p>
//               <button
//                 className="btn transparent"
//                 id="sign-in-btn"
//                 onClick={handleSignInClick}
//               >
//                 Sign in
//               </button>
//             </div>
//             <img src="./images/login.png" className="image" alt="login" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import "./LogSig.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_mobile: "",
    user_role: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Toggle between Sign Up and Sign In
  const handleSignUpClick = () => {
    setIsSignUp(true);
    setErrors({});
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Validators for fields
  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9]{3,15}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation for Sign Up
    if (isSignUp) {
      if (!validateUsername(formData.user_name)) {
        setErrors({
          general:
            "Username must be 3-15 characters long and contain no spaces or special characters.",
        });
        return;
      }
      if (!validatePassword(formData.user_password)) {
        setErrors({
          general:
            "Password must include at least 1 uppercase, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters.",
        });
        return;
      }
      if (!validatePhoneNumber(formData.user_mobile)) {
        setErrors({ general: "Phone number must consist of exactly 10 digits." });
        return;
      }
      if (!validateEmail(formData.user_email)) {
        setErrors({ general: "Enter a valid email (e.g., example@gmail.com)." });
        return;
      }
    }

    try {
      const endpoint = isSignUp
        ? "http://localhost:5000/api/users/register"
        : "http://localhost:5000/api/users/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Ensure cookies are included in the request
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignUp) {
          alert("Registration successful. Please sign in.");
          setIsSignUp(false);
          setFormData({
            user_name: "",
            user_email: "",
            user_password: "",
            user_mobile: "",
            user_role: "",
          });
        } else {
          setUser(data.data);
          localStorage.setItem("user", JSON.stringify(data.data));
          alert("Login successful");

          if (data.data.user_role === "Admin") {
            navigate("/Dashboard");
          } else {
            navigate("/home", { state: { user: data.data } });
          }
        }
      } else {
        setErrors({ general: data.error || "Something went wrong." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="login">
      <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* Sign In Form */}
            <form
              onSubmit={handleSubmit}
              className={`sign-in-form ${isSignUp ? "hidden" : ""}`}
            >
              <h2 className="title">Sign in</h2>
              {errors.general && <div className="error">{errors.general}</div>}
              <div className="input-field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  placeholder="Username"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-field">
                <i>
                  <FaUser />
                </i>
                <select
                  name="user_role"
                  value={formData.user_role}
                  onChange={handleInputChange}
                  required
                  className="dropdown"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="input-field password-field">
                <i>
                  <FaLock />
                </i>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  required
                />
                <i onClick={togglePasswordVisibility} className="password-eye">
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>

            {/* Sign Up Form */}
            <form
              onSubmit={handleSubmit}
              className={`sign-up-form ${isSignUp ? "" : "hidden"}`}
            >
              <h2 className="title">Sign up</h2>
              {errors.general && <div className="error">{errors.general}</div>}
              {/* <div className="input-field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  placeholder="Username"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div className="input-field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  placeholder="Username"
                  name="user_name"
                  value={formData.user_name}
                  onChange={(e) => {
                    if (e.target.value.length <= 15) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength="15"
                  required
                />
              </div>

              <div className="input-field">
                <i>
                  <FaEnvelope />
                </i>
                <input
                  type="email"
                  placeholder="Email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-field">
                <i>
                  <FaPhone />
                </i>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="user_mobile"
                  value={formData.user_mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-field">
                <i>
                  <FaUser />
                </i>
                <select
                  name="user_role"
                  value={formData.user_role}
                  onChange={handleInputChange}
                  required
                  className="dropdown"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="input-field password-field">
                <i>
                  <FaLock />
                </i>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  required
                />
                <i onClick={togglePasswordVisibility} className="password-eye">
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
              <input type="submit" value="Sign up" className="btn solid" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>Let us help you register your account!</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
            </div>
            <img src="./images/login.png" className="image" alt="register" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already a member?</h3>
              <p>We are excited to welcome you back!</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignInClick}
              >
                Sign in
              </button>
            </div>
            <img src="./images/login.png" className="image" alt="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



















// // import React, { useState, useContext } from "react";
// // import {
// //   FaUser,
// //   FaLock,
// //   FaFacebook,
// //   FaTwitter,
// //   FaGoogle,
// //   FaLinkedinIn,
// //   FaEnvelope,
// //   FaPhone,
// //   FaEye,
// //   FaEyeSlash,
// // } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";
// // import { UserContext } from "../userContext"; // Ensure this is correctly imported
// // import "./LogSig.css";

// // const Login = () => {
// //   const [isSignUp, setIsSignUp] = useState(false);
// //   const [formData, setFormData] = useState({
// //     user_name: "",
// //     user_email: "",
// //     user_password: "",
// //     user_mobile: "",
// //     user_dob: "",
// //     user_role: "User", // Default value for dropdown
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [passwordVisible, setPasswordVisible] = useState(false);
// //   const navigate = useNavigate();
// //   const { setUser } = useContext(UserContext);

// //   const handleSignUpClick = () => {
// //     setIsSignUp(true);
// //     setErrors({});
// //   };

// //   const handleSignInClick = () => {
// //     setIsSignUp(false);
// //     setErrors({});
// //   };

// //   const handleInputChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const togglePasswordVisibility = () => {
// //     setPasswordVisible(!passwordVisible);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Perform any required validation before sending to backend
// //     // ...

// //     try {
// //       const endpoint = isSignUp
// //         ? "http://localhost:3000/api/users/register"
// //         : "http://localhost:3000/api/users/login";
// //       const response = await fetch(endpoint, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         if (isSignUp) {
// //           alert("Registration successful. Please sign in.");
// //           setIsSignUp(false);
// //           setFormData({
// //             user_name: "",
// //             user_email: "",
// //             user_password: "",
// //             user_mobile: "",
// //             user_dob: "",
// //             user_role: "User",
// //           });
// //         } else {
// //           setUser(data.data || formData);
// //           localStorage.setItem("user", JSON.stringify(data.data || formData));
// //           alert("Login successful");
// //           navigate("/profile", { state: { user: data.data || formData } });
// //         }
// //       } else {
// //         setErrors({ general: data.error || "An error occurred. Please try again." });
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setErrors({ general: "An error occurred. Please try again later." });
// //     }
// //   };

// //   return (
// //     <div className="login">
// //       <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
// //         <div className="forms-container">
// //           <div className="signin-signup">
// //             {/* Sign In Form */}
// //             <form
// //               onSubmit={handleSubmit}
// //               className={`sign-in-form ${isSignUp ? "hidden" : ""}`}
// //             >
// //               <h2 className="title">Sign in</h2>
// //               {errors.general && <div className="error">{errors.general}</div>}
// //               <div className="input-field">
// //                 <i>
// //                   <FaUser />
// //                 </i>
// //                 <input
// //                   type="text"
// //                   placeholder="Username"
// //                   name="user_name"
// //                   value={formData.user_name}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>
// //               <div className="input-field password-field">
// //                 <i>
// //                   <FaLock />
// //                 </i>
// //                 <input
// //                   type={passwordVisible ? "text" : "password"}
// //                   placeholder="Password"
// //                   name="user_password"
// //                   value={formData.user_password}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //                 <i onClick={togglePasswordVisibility} className="password-eye">
// //                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
// //                 </i>
// //               </div>
// //               {/* Dropdown Menu */}
// //               <div className="input-field">
// //                 <label>Role:</label>
// //                 <select
// //                   name="user_role"
// //                   value={formData.user_role}
// //                   onChange={handleInputChange}
// //                   required
// //                 >
// //                   <option value="User">User</option>
// //                   <option value="Admin">Admin</option>
// //                 </select>
// //               </div>
// //               <input type="submit" value="Login" className="btn solid" />
// //             </form>

// //             {/* Sign Up Form */}
// //             <form
// //               onSubmit={handleSubmit}
// //               className={`sign-up-form ${isSignUp ? "" : "hidden"}`}
// //             >
// //               <h2 className="title">Sign up</h2>
// //               {errors.general && <div className="error">{errors.general}</div>}
// //               <div className="input-field">
// //                 <i>
// //                   <FaUser />
// //                 </i>
// //                 <input
// //                   type="text"
// //                   placeholder="Username"
// //                   name="user_name"
// //                   value={formData.user_name}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>
// //               <div className="input-field">
// //                 <i>
// //                   <FaEnvelope />
// //                 </i>
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   name="user_email"
// //                   value={formData.user_email}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>
// //               <div className="input-field">
// //                 <i>
// //                   <FaPhone />
// //                 </i>
// //                 <input
// //                   type="text"
// //                   placeholder="Phone Number"
// //                   name="user_mobile"
// //                   value={formData.user_mobile}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </div>
// //               <div className="input-field password-field">
// //                 <i>
// //                   <FaLock />
// //                 </i>
// //                 <input
// //                   type={passwordVisible ? "text" : "password"}
// //                   placeholder="Password"
// //                   name="user_password"
// //                   value={formData.user_password}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //                 <i onClick={togglePasswordVisibility} className="password-eye">
// //                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
// //                 </i>
// //               </div>
// //               {/* Dropdown Menu */}
// //               <div className="input-field">
// //                 <label>Role:</label>
// //                 <select
// //                   name="user_role"
// //                   value={formData.user_role}
// //                   onChange={handleInputChange}
// //                   required
// //                 >
// //                   <option value="User">User</option>
// //                   <option value="Admin">Admin</option>
// //                 </select>
// //               </div>
// //               <input type="submit" value="Sign up" className="btn solid" />
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


