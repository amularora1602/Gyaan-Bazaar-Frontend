

// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import axios from "axios";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "./EventForm.css";

// // const EventForm = ({ showForm, toggleForm, onSubmit }) => {
// //   const initialFormData = {
// //     eventName: "",
// //     eventDate: new Date(),
// //     eventTime: "",
// //     eventPlace: "",
// //     invitedPeople: 0,
// //     eventImage: null,
// //     eventDescription: "",
// //     numberOfSpeakers: 0,
// //     speakers: [],
// //   };

// //   const [formPage, setFormPage] = useState(1);
// //   const [formData, setFormData] = useState(initialFormData);

// //   const resetForm = () => {
// //     setFormPage(1);
// //     setFormData(initialFormData);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: value }));
// //   };

// //   const handleDateChange = (date) => {
// //     setFormData((prevData) => ({ ...prevData, eventDate: date }));
// //   };

// //   const handleNumberOfSpeakersChange = (e) => {
// //     const numberOfSpeakers = parseInt(e.target.value);
// //     const speakers = Array.from({ length: numberOfSpeakers }, () => ({
// //       name: "",
// //       image: null,
// //     }));
// //     setFormData((prevData) => ({ ...prevData, numberOfSpeakers, speakers }));
// //   };

// //   const handleSpeakerChange = (index, e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => {
// //       const updatedSpeakers = [...prevData.speakers];
// //       updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
// //       return { ...prevData, speakers: updatedSpeakers };
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     const { name, files } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
// //   };

// //   const handleNext = () => setFormPage(2);
// //   const handleBack = () => setFormPage(1);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formDataToSend = new FormData();
// //     formDataToSend.append('eventName', formData.eventName);
// //     formDataToSend.append('eventDate', formData.eventDate);
// //     formDataToSend.append('eventTime', formData.eventTime);
// //     formDataToSend.append('eventPlace', formData.eventPlace);
// //     formDataToSend.append('invitedPeople', formData.invitedPeople);
// //     formDataToSend.append('eventImage', formData.eventImage);
// //     formDataToSend.append('eventDescription', formData.eventDescription);
// //     formDataToSend.append('numberOfSpeakers', formData.numberOfSpeakers);
// //     formDataToSend.append('speakers', JSON.stringify(formData.speakers));

// //     try {
// //       await onSubmit(formDataToSend); 
// //       resetForm(); // Reset the form after successful submission
// //     } catch (err) {
// //       console.error("Error submitting form:", err);
// //     }
// //   };

// //   return (
// //     showForm && (
// //       <div className="event-form-modal">
// //         <div className="event-form-content">
// //           <button
// //             className="event-close-btn"
// //             onClick={() => {
// //               resetForm(); // Reset the form when closing
// //               toggleForm();
// //             }}
// //           >
// //             ×
// //           </button>
// //           <h2>{formPage === 1 ? "Event Details" : "Event Description"}</h2>

// //           {formPage === 1 && (
// //             <div>
// //               <div className="event-form-group">
// //                 <label>Event Name:</label>
// //                 <input
// //                   type="text"
// //                   name="eventName"
// //                   value={formData.eventName}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Date:</label>
// //                 <DatePicker
// //                   selected={formData.eventDate}
// //                   onChange={handleDateChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Time:</label>
// //                 <input
// //                   type="time"
// //                   name="eventTime"
// //                   value={formData.eventTime}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Place:</label>
// //                 <input
// //                   type="text"
// //                   name="eventPlace"
// //                   value={formData.eventPlace}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Number of Invited People:</label>
// //                 <input
// //                   type="number"
// //                   name="invitedPeople"
// //                   value={formData.invitedPeople}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Upload Event Image:</label>
// //                 <input
// //                   type="file"
// //                   name="eventImage"
// //                   onChange={handleFileChange}
// //                 />
// //               </div>
// //               <div className="event-form-buttons">
// //                 <button onClick={handleNext} className="event-next-btn">
// //                   Next
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {formPage === 2 && (
// //             <div>
// //               <div className="event-form-group">
// //                 <label>Event Description:</label>
// //                 <textarea
// //                   name="eventDescription"
// //                   value={formData.eventDescription}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Number of Speakers:</label>
// //                 <input
// //                   type="number"
// //                   name="numberOfSpeakers"
// //                   value={formData.numberOfSpeakers}
// //                   onChange={handleNumberOfSpeakersChange}
// //                 />
// //               </div>
// //               {formData.speakers.map((speaker, index) => (
// //                 <div key={index} className="speaker-form-group">
// //                   <label>Speaker {index + 1} Name:</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={speaker.name}
// //                     onChange={(e) => handleSpeakerChange(index, e)}
// //                   />
// //                   <label>Speaker {index + 1} Image:</label>
// //                   <input
// //                     type="file"
// //                     name="image"
// //                     onChange={(e) => handleSpeakerChange(index, e)}
// //                   />
// //                 </div>
// //               ))}
// //               <div className="event-form-buttons">
// //                 <button onClick={handleBack} className="event-back-btn">
// //                   Back
// //                 </button>
// //                 <button onClick={handleSubmit} className="event-submit-btn">
// //                   Submit
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     )
// //   );
// // };

// // export default EventForm;

















// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import axios from "axios";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "./EventForm.css";

// // const EventForm = ({ showForm, toggleForm, onSubmit }) => {
// //   const initialFormData = {
// //     eventName: "",
// //     eventDate: new Date(),
// //     eventTime: "",
// //     eventPlace: "",
// //     invitedPeople: 0,
// //     eventImage: null,
// //     eventDescription: "",
// //     numberOfSpeakers: 0,
// //     speakers: [],
// //   };

// //   const [formPage, setFormPage] = useState(1);
// //   const [formData, setFormData] = useState(initialFormData);

// //   const resetForm = () => {
// //     setFormPage(1);
// //     setFormData(initialFormData);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: value }));
// //   };

// //   const handleDateChange = (date) => {
// //     setFormData((prevData) => ({ ...prevData, eventDate: date }));
// //   };

// //   const handleNumberOfSpeakersChange = (e) => {
// //     const numberOfSpeakers = parseInt(e.target.value);
// //     const speakers = Array.from({ length: numberOfSpeakers }, () => ({
// //       name: "",
// //       designation: "", // Changed from image to designation
// //     }));
// //     setFormData((prevData) => ({ ...prevData, numberOfSpeakers, speakers }));
// //   };

// //   const handleSpeakerChange = (index, e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => {
// //       const updatedSpeakers = [...prevData.speakers];
// //       updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
// //       return { ...prevData, speakers: updatedSpeakers };
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     const { name, files } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
// //   };

// //   const handleNext = () => setFormPage(2);
// //   const handleBack = () => setFormPage(1);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formDataToSend = new FormData();
// //     formDataToSend.append('eventName', formData.eventName);
// //     formDataToSend.append('eventDate', formData.eventDate);
// //     formDataToSend.append('eventTime', formData.eventTime);
// //     formDataToSend.append('eventPlace', formData.eventPlace);
// //     formDataToSend.append('invitedPeople', formData.invitedPeople);
// //     formDataToSend.append('eventImage', formData.eventImage);
// //     formDataToSend.append('eventDescription', formData.eventDescription);
// //     formDataToSend.append('numberOfSpeakers', formData.numberOfSpeakers);
// //     formDataToSend.append('speakers', JSON.stringify(formData.speakers));

// //     try {
// //       await onSubmit(formDataToSend); 
// //       resetForm(); // Reset the form after successful submission
// //     } catch (err) {
// //       console.error("Error submitting form:", err);
// //     }
// //   };

// //   return (
// //     showForm && (
// //       <div className="event-form-modal">
// //         <div className="event-form-content">
// //           <button
// //             className="event-close-btn"
// //             onClick={() => {
// //               resetForm(); // Reset the form when closing
// //               toggleForm();
// //             }}
// //           >
// //             ×
// //           </button>
// //           <h2>{formPage === 1 ? "Event Details" : "Event Description"}</h2>

// //           {formPage === 1 && (
// //             <div>
// //               <div className="event-form-group">
// //                 <label>Event Name:</label>
// //                 <input
// //                   type="text"
// //                   name="eventName"
// //                   value={formData.eventName}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Date:</label>
// //                 <DatePicker
// //                   selected={formData.eventDate}
// //                   onChange={handleDateChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Time:</label>
// //                 <input
// //                   type="time"
// //                   name="eventTime"
// //                   value={formData.eventTime}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Place:</label>
// //                 <input
// //                   type="text"
// //                   name="eventPlace"
// //                   value={formData.eventPlace}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Number of Invited People:</label>
// //                 <input
// //                   type="number"
// //                   name="invitedPeople"
// //                   value={formData.invitedPeople}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Upload Event Image:</label>
// //                 <input
// //                   type="file"
// //                   name="eventImage"
// //                   onChange={handleFileChange}
// //                 />
// //               </div>
// //               <div className="event-form-buttons">
// //                 <button onClick={handleNext} className="event-next-btn">
// //                   Next
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {formPage === 2 && (
// //             <div>
// //               <div className="event-form-group">
// //                 <label>Event Description:</label>
// //                 <textarea
// //                   name="eventDescription"
// //                   value={formData.eventDescription}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Number of Speakers:</label>
// //                 <input
// //                   type="number"
// //                   name="numberOfSpeakers"
// //                   value={formData.numberOfSpeakers}
// //                   onChange={handleNumberOfSpeakersChange}
// //                 />
// //               </div>
// //               {formData.speakers.map((speaker, index) => (
// //                 <div key={index} className="speaker-form-group">
// //                   <label>Speaker {index + 1} Name:</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={speaker.name}
// //                     onChange={(e) => handleSpeakerChange(index, e)}
// //                   />
// //                   <label>Speaker {index + 1} Designation:</label>
// //                   <input
// //                     type="text"
// //                     name="designation"
// //                     value={speaker.designation}
// //                     onChange={(e) => handleSpeakerChange(index, e)}
// //                   />
// //                 </div>
// //               ))}
// //               <div className="event-form-buttons">
// //                 <button onClick={handleBack} className="event-back-btn">
// //                   Back
// //                 </button>
// //                 <button onClick={handleSubmit} className="event-submit-btn">
// //                   Submit
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     )
// //   );
// // };

// // export default EventForm;





// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import axios from "axios";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "./EventForm.css";

// // const EventForm = ({ showForm, toggleForm, onSubmit }) => {
// //   const initialFormData = {
// //     eventName: "",
// //     eventDate: new Date(),
// //     eventTime: "",
// //     eventPlace: "",
// //     invitedPeople: 0,
// //     eventImage: null,
// //     eventDescription: "",
// //     numberOfSpeakers: 0,
// //     speakers: [],
// //   };

// //   const [formPage, setFormPage] = useState(1);
// //   const [formData, setFormData] = useState(initialFormData);

// //   const resetForm = () => {
// //     setFormPage(1);
// //     setFormData(initialFormData);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;

    
// //     // Prevent negative numbers for invited people
// //     if (name === "invitedPeople" && value < 0) return;
// //     setFormData((prevData) => ({ ...prevData, [name]: value }));
// //   };

// //   const handleDateChange = (date) => {
// //     setFormData((prevData) => ({ ...prevData, eventDate: date }));
// //   };

// //   const handleTimeChange = (e) => {
// //     const selectedTime = e.target.value;
// //     const currentDate = new Date();
// //     const selectedDate = new Date(formData.eventDate);

// //     // Prevent selecting past time for today's date
// //     if (
// //       selectedDate.toDateString() === currentDate.toDateString() &&
// //       selectedTime < currentDate.toLocaleTimeString("en-US", { hour12: false })
// //     ) {
// //       alert("You cannot select a past time for today's event.");
// //       return;
// //     }
// //     setFormData((prevData) => ({ ...prevData, eventTime: selectedTime }));
// //   };

// //   const handleNumberOfSpeakersChange = (e) => {
// //     const numberOfSpeakers = parseInt(e.target.value);
// //     if (numberOfSpeakers < 0) return; // Prevent negative numbers for speakers
// //     const speakers = Array.from({ length: numberOfSpeakers }, () => ({
// //       name: "",
// //       designation: "",
// //     }));
// //     setFormData((prevData) => ({ ...prevData, numberOfSpeakers, speakers }));
// //   };

// //   const handleSpeakerChange = (index, e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => {
// //       const updatedSpeakers = [...prevData.speakers];
// //       updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
// //       return { ...prevData, speakers: updatedSpeakers };
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     const { name, files } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
// //   };

// //   const handleNext = () => setFormPage(2);
// //   const handleBack = () => setFormPage(1);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formDataToSend = new FormData();
// //     formDataToSend.append("eventName", formData.eventName);
// //     formDataToSend.append("eventDate", formData.eventDate);
// //     formDataToSend.append("eventTime", formData.eventTime);
// //     formDataToSend.append("eventPlace", formData.eventPlace);
// //     formDataToSend.append("invitedPeople", formData.invitedPeople);
// //     formDataToSend.append("eventImage", formData.eventImage);
// //     formDataToSend.append("eventDescription", formData.eventDescription);
// //     formDataToSend.append("numberOfSpeakers", formData.numberOfSpeakers);
// //     formDataToSend.append("speakers", JSON.stringify(formData.speakers));

// //     try {
// //       await onSubmit(formDataToSend);
// //       resetForm(); // Reset the form after successful submission
// //     } catch (err) {
// //       console.error("Error submitting form:", err);
// //     }
// //   };

// //   return (
// //     showForm && (
// //       <div className="event-form-modal">
// //         <div className="event-form-content">
// //           <button
// //             className="event-close-btn"
// //             onClick={() => {
// //               resetForm(); // Reset the form when closing
// //               toggleForm();
// //             }}
// //           >
// //             ×
// //           </button>
// //           <h2>{formPage === 1 ? "Event Details" : "Event Description"}</h2>

// //           {formPage === 1 && (
// //             <div>
// //               <div className="event-form-group">
// //                 <label>Event Name:</label>
// //                 <input
// //                   type="text"
// //                   name="eventName"
// //                   value={formData.eventName}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Date:</label>
// //                 <DatePicker
// //                   selected={formData.eventDate}
// //                   onChange={handleDateChange}
// //                   minDate={new Date()} // Prevent selecting past dates
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Time:</label>
// //                 <input
// //                   type="time"
// //                   name="eventTime"
// //                   value={formData.eventTime}
// //                   onChange={handleTimeChange}
// //                   minTime={new Date().toLocaleTimeString("en-US", { hour12: false })}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Event Place:</label>
// //                 <input
// //                   type="text"
// //                   name="eventPlace"
// //                   value={formData.eventPlace}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Number of Invited People:</label>
// //                 <input
// //                   type="number"
// //                   name="invitedPeople"
// //                   value={formData.invitedPeople}
// //                   onChange={handleInputChange}
// //                   min="0" // Prevent negative numbers
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Upload Event Image:</label>
// //                 <input
// //                   type="file"
// //                   name="eventImage"
// //                   onChange={handleFileChange}
// //                 />
// //               </div>
// //               <div className="event-form-buttons">
// //                 <button onClick={handleNext} className="event-next-btn">
// //                   Next
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {formPage === 2 && (
// //             <div>
// //               <div className="event-form-group">
// //                 <label>Event Description:</label>
// //                 <textarea
// //                   name="eventDescription"
// //                   value={formData.eventDescription}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="event-form-group">
// //                 <label>Number of Speakers:</label>
// //                 <input
// //                   type="number"
// //                   name="numberOfSpeakers"
// //                   value={formData.numberOfSpeakers}
// //                   onChange={handleNumberOfSpeakersChange}
// //                   min="0" // Prevent negative numbers
// //                 />
// //               </div>
// //               {formData.speakers.map((speaker, index) => (
// //                 <div key={index} className="speaker-form-group">
// //                   <label>Speaker {index + 1} Name:</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={speaker.name}
// //                     onChange={(e) => handleSpeakerChange(index, e)}
// //                   />
// //                   <label>Speaker {index + 1} Designation:</label>
// //                   <input
// //                     type="text"
// //                     name="designation"
// //                     value={speaker.designation}
// //                     onChange={(e) => handleSpeakerChange(index, e)}
// //                   />
// //                 </div>
// //               ))}
// //               <div className="event-form-buttons">
// //                 <button onClick={handleBack} className="event-back-btn">
// //                   Back
// //                 </button>
// //                 <button onClick={handleSubmit} className="event-submit-btn">
// //                   Submit
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     )
// //   );
// // };

// // export default EventForm;






// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import "./EventForm.css";

// const EventForm = ({ showForm, toggleForm, onSubmit }) => {
//   const initialFormData = {
//     eventName: "",
//     eventDate: new Date(),
//     eventTime: "",
//     eventPlace: "",
//     invitedPeople: 0,
//     eventImage: null,
//     eventDescription: "",
//     numberOfSpeakers: 0,
//     speakers: [],
//   };

//   const [formPage, setFormPage] = useState(1);
//   const [formData, setFormData] = useState(initialFormData);
//   const [error, setError] = useState("");

//   const resetForm = () => {
//     setFormPage(1);
//     setFormData(initialFormData);
//     setError("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Event Name Validation
//     if (name === "eventName") {
//       if (value.length > 50) {
//         setError("Event name cannot exceed 50 characters.");
//         return;
//       } else {
//         setError("");
//       }
//     }
//     if (place === "eventPlace") {
//       if (value.length > 20) {
//         setError("Event place cannot exceed 20 characters.");
//         return;
//       } else {
//         setError("");
//       }
//     }


//     // Prevent negative numbers for invited people
//     if (name === "invitedPeople" && value < 0) return;

//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prevData) => ({ ...prevData, eventDate: date }));
//   };

//   const handleTimeChange = (e) => {
//     const selectedTime = e.target.value;
//     const currentDate = new Date();
//     const selectedDate = new Date(formData.eventDate);

//     // Prevent selecting past time for today's date
//     if (
//       selectedDate.toDateString() === currentDate.toDateString() &&
//       selectedTime < currentDate.toLocaleTimeString("en-US", { hour12: false })
//     ) {
//       alert("You cannot select a past time for today's event.");
//       return;
//     }
//     setFormData((prevData) => ({ ...prevData, eventTime: selectedTime }));
//   };

//   const handleNumberOfSpeakersChange = (e) => {
//     const numberOfSpeakers = parseInt(e.target.value);
//     if (numberOfSpeakers < 0) return; // Prevent negative numbers for speakers
//     const speakers = Array.from({ length: numberOfSpeakers }, () => ({
//       name: "",
//       designation: "",
//     }));
//     setFormData((prevData) => ({ ...prevData, numberOfSpeakers, speakers }));
//   };

//   const handleSpeakerChange = (index, e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       const updatedSpeakers = [...prevData.speakers];
//       updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
//       return { ...prevData, speakers: updatedSpeakers };
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
//   };

//   const handleNext = () => setFormPage(2);
//   const handleBack = () => setFormPage(1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("eventName", formData.eventName);
//     formDataToSend.append("eventDate", formData.eventDate);
//     formDataToSend.append("eventTime", formData.eventTime);
//     formDataToSend.append("eventPlace", formData.eventPlace);
//     formDataToSend.append("invitedPeople", formData.invitedPeople);
//     formDataToSend.append("eventImage", formData.eventImage);
//     formDataToSend.append("eventDescription", formData.eventDescription);
//     formDataToSend.append("numberOfSpeakers", formData.numberOfSpeakers);
//     formDataToSend.append("speakers", JSON.stringify(formData.speakers));

//     try {
//       await onSubmit(formDataToSend);
//       resetForm(); // Reset the form after successful submission
//     } catch (err) {
//       console.error("Error submitting form:", err);
//     }
//   };

//   return (
//     showForm && (
//       <div className="event-form-modal">
//         <div className="event-form-content">
//           <button
//             className="event-close-btn"
//             onClick={() => {
//               resetForm(); // Reset the form when closing
//               toggleForm();
//             }}
//           >
//             ×
//           </button>
//           <h2>{formPage === 1 ? "Event Details" : "Event Description"}</h2>

//           {formPage === 1 && (
//             <div>
//               <div className="event-form-group">
//                 <label>Event Name:</label>
//                 <input
//                   type="text"
//                   name="eventName"
//                   value={formData.eventName}
//                   onChange={handleInputChange}
//                 />
//                 {error && <p className="error-message">{error}</p>}
//               </div>
//               <div className="event-form-group">
//                 <label>Event Date:</label>
//                 <DatePicker
//                   selected={formData.eventDate}
//                   onChange={handleDateChange}
//                   minDate={new Date()} // Prevent selecting past dates
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Event Time:</label>
//                 <input
//                   type="time"
//                   name="eventTime"
//                   value={formData.eventTime}
//                   onChange={handleTimeChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Event Place:</label>
//                 <input
//                   type="text"
//                   name="eventPlace"
//                   value={formData.eventPlace}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Number of Invited People:</label>
//                 <input
//                   type="number"
//                   name="invitedPeople"
//                   value={formData.invitedPeople}
//                   onChange={handleInputChange}
//                   min="0" // Prevent negative numbers
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Upload Event Image:</label>
//                 <input
//                   type="file"
//                   name="eventImage"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <div className="event-form-buttons">
//                 <button onClick={handleNext} className="event-next-btn">
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {formPage === 2 && (
//             <div>
//               <div className="event-form-group">
//                 <label>Event Description:</label>
//                 <textarea
//                   name="eventDescription"
//                   value={formData.eventDescription}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Number of Speakers:</label>
//                 <input
//                   type="number"
//                   name="numberOfSpeakers"
//                   value={formData.numberOfSpeakers}
//                   onChange={handleNumberOfSpeakersChange}
//                   min="0" // Prevent negative numbers
//                 />
//               </div>
//               {formData.speakers.map((speaker, index) => (
//                 <div key={index} className="speaker-form-group">
//                   <label>Speaker {index + 1} Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={speaker.name}
//                     onChange={(e) => handleSpeakerChange(index, e)}
//                   />
//                   <label>Speaker {index + 1} Designation:</label>
//                   <input
//                     type="text"
//                     name="designation"
//                     value={speaker.designation}
//                     onChange={(e) => handleSpeakerChange(index, e)}
//                   />
//                 </div>
//               ))}
//               <div className="event-form-buttons">
//                 <button onClick={handleBack} className="event-back-btn">
//                   Back
//                 </button>
//                 <button onClick={handleSubmit} className="event-submit-btn">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default EventForm;




// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import "./EventForm.css";

// const EventForm = ({ showForm, toggleForm, onSubmit }) => {
//   const initialFormData = {
//     eventName: "",
//     eventDate: new Date(),
//     eventTime: "",
//     eventPlace: "",
//     invitedPeople: 0,
//     eventImage: null,
//     eventDescription: "",
//     numberOfSpeakers: 0,
//     speakers: [],
//   };

//   const [formPage, setFormPage] = useState(1);
//   const [formData, setFormData] = useState(initialFormData);
//   const [error, setError] = useState(""); // Error message state

//   const resetForm = () => {
//     setFormPage(1);
//     setFormData(initialFormData);
//     setError(""); // Reset the error
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Validate eventName length
//     if (name === "eventName") {
//       if (value.length > 50) {
//         setError("Event name cannot exceed 50 characters.");
//         return;
//       } else {
//         setError("");
//       }
//     }

//     // Validate eventPlace length
//     if (name === "eventPlace") {
//       if (value.length > 20) {
//         setError("Event place cannot exceed 20 characters.");
//         return;
//       } else {
//         setError("");
//       }
//     }

//     // Prevent negative numbers for invitedPeople
//     if (name === "invitedPeople" && value < 0) return;

//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prevData) => ({ ...prevData, eventDate: date }));
//   };

//   const handleTimeChange = (e) => {
//     const selectedTime = e.target.value;
//     const currentDate = new Date();
//     const selectedDate = new Date(formData.eventDate);

//     // Prevent selecting past time for today's date
//     if (
//       selectedDate.toDateString() === currentDate.toDateString() &&
//       selectedTime < currentDate.toLocaleTimeString("en-US", { hour12: false })
//     ) {
//       alert("You cannot select a past time for today's event.");
//       return;
//     }
//     setFormData((prevData) => ({ ...prevData, eventTime: selectedTime }));
//   };

//   const handleNumberOfSpeakersChange = (e) => {
//     const numberOfSpeakers = parseInt(e.target.value);
//     if (numberOfSpeakers < 0) return; // Prevent negative numbers for speakers
//     const speakers = Array.from({ length: numberOfSpeakers }, () => ({
//       name: "",
//       designation: "",
//     }));
//     setFormData((prevData) => ({ ...prevData, numberOfSpeakers, speakers }));
//   };

//   const handleSpeakerChange = (index, e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       const updatedSpeakers = [...prevData.speakers];
//       updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
//       return { ...prevData, speakers: updatedSpeakers };
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
//   };

//   const handleNext = () => setFormPage(2);
//   const handleBack = () => setFormPage(1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("eventName", formData.eventName);
//     formDataToSend.append("eventDate", formData.eventDate);
//     formDataToSend.append("eventTime", formData.eventTime);
//     formDataToSend.append("eventPlace", formData.eventPlace);
//     formDataToSend.append("invitedPeople", formData.invitedPeople);
//     formDataToSend.append("eventImage", formData.eventImage);
//     formDataToSend.append("eventDescription", formData.eventDescription);
//     formDataToSend.append("numberOfSpeakers", formData.numberOfSpeakers);
//     formDataToSend.append("speakers", JSON.stringify(formData.speakers));

//     try {
//       await onSubmit(formDataToSend);
//       resetForm(); // Reset the form after successful submission
//     } catch (err) {
//       console.error("Error submitting form:", err);
//     }
//   };

//   return (
//     showForm && (
//       <div className="event-form-modal">
//         <div className="event-form-content">
//           <button
//             className="event-close-btn"
//             onClick={() => {
//               resetForm(); // Reset the form when closing
//               toggleForm();
//             }}
//           >
//             ×
//           </button>
//           <h2>{formPage === 1 ? "Event Details" : "Event Description"}</h2>

//           {error && <p className="error-message">{error}</p>} {/* Error Message */}

//           {formPage === 1 && (
//             <div>
//               <div className="event-form-group">
//                 <label>Event Name:</label>
//                 <input
//                   type="text"
//                   name="eventName"
//                   value={formData.eventName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Event Date:</label>
//                 <DatePicker
//                   selected={formData.eventDate}
//                   onChange={handleDateChange}
//                   minDate={new Date()} // Prevent selecting past dates
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Event Time:</label>
//                 <input
//                   type="time"
//                   name="eventTime"
//                   value={formData.eventTime}
//                   onChange={handleTimeChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Event Place:</label>
//                 <input
//                   type="text"
//                   name="eventPlace"
//                   value={formData.eventPlace}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Number of Invited People:</label>
//                 <input
//                   type="number"
//                   name="invitedPeople"
//                   value={formData.invitedPeople}
//                   onChange={handleInputChange}
//                   min="0" // Prevent negative numbers
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Upload Event Image:</label>
//                 <input
//                   type="file"
//                   name="eventImage"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <div className="event-form-buttons">
//                 <button onClick={handleNext} className="event-next-btn">
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {formPage === 2 && (
//             <div>
//               <div className="event-form-group">
//                 <label>Event Description:</label>
//                 <textarea
//                   name="eventDescription"
//                   value={formData.eventDescription}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="event-form-group">
//                 <label>Number of Speakers:</label>
//                 <input
//                   type="number"
//                   name="numberOfSpeakers"
//                   value={formData.numberOfSpeakers}
//                   onChange={handleNumberOfSpeakersChange}
//                   min="0" // Prevent negative numbers
//                 />
//               </div>
//               {formData.speakers.map((speaker, index) => (
//                 <div key={index} className="speaker-form-group">
//                   <label>Speaker {index + 1} Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={speaker.name}
//                     onChange={(e) => handleSpeakerChange(index, e)}
//                   />
//                   <label>Speaker {index + 1} Designation:</label>
//                   <input
//                     type="text"
//                     name="designation"
//                     value={speaker.designation}
//                     onChange={(e) => handleSpeakerChange(index, e)}
//                   />
//                 </div>
//               ))}
//               <div className="event-form-buttons">
//                 <button onClick={handleBack} className="event-back-btn">
//                   Back
//                 </button>
//                 <button onClick={handleSubmit} className="event-submit-btn">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default EventForm;


import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventForm.css";

const EventForm = ({ showForm, toggleForm, onSubmit }) => {
  const initialFormData = {
    eventName: "",
    eventDate: new Date(),
    eventTime: "",
    eventPlace: "",
    invitedPeople: 0,
    eventImage: null,
    eventDescription: "",
    numberOfSpeakers: 0,
    speakers: [],
  };

  const [formPage, setFormPage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(""); // Error message state

  const resetForm = () => {
    setFormPage(1);
    setFormData(initialFormData);
    setError(""); // Reset the error
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate eventName length
    if (name === "eventName") {
      if (value.length > 50) {
        setError("Event name cannot exceed 50 characters.");
        return;
      } else {
        setError("");
      }
    }

    // Validate eventPlace length
    if (name === "eventPlace") {
      if (value.length > 20) {
        setError("Event place cannot exceed 20 characters.");
        return;
      } else {
        setError("");
      }
    }

    // Prevent negative numbers for invitedPeople
    if (name === "invitedPeople" && value < 0) return;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, eventDate: date }));
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const currentDate = new Date();
    const selectedDate = new Date(formData.eventDate);

    // Prevent selecting past time for today's date
    if (
      selectedDate.toDateString() === currentDate.toDateString() &&
      selectedTime < currentDate.toLocaleTimeString("en-US", { hour12: false })
    ) {
      alert("You cannot select a past time for today's event.");
      return;
    }
    setFormData((prevData) => ({ ...prevData, eventTime: selectedTime }));
  };

  const handleNumberOfSpeakersChange = (e) => {
    // Parse the input, remove leading zeros, and convert to a valid integer
    const sanitizedValue = e.target.value.replace(/^0+/, ""); // Remove leading zeros
    const numberOfSpeakers = parseInt(sanitizedValue || "0", 10); // Fallback to 0 if empty

    // Validate the number of speakers
    if (numberOfSpeakers < 1 || numberOfSpeakers > 10) {
      setError("Number of speakers must be between 1 and 10.");
      return;
    }

    setError(""); // Clear any previous errors
    const speakers = Array.from({ length: numberOfSpeakers }, () => ({
      name: "",
      designation: "",
    }));
    setFormData((prevData) => ({ ...prevData, numberOfSpeakers, speakers }));
  };

  const handleSpeakerChange = (index, e) => {
    const { name, value } = e.target;
    if (name === "name") {
      // Validate name length
      if (value.length > 20) {
        setError("Speaker name cannot exceed 20 characters.");
        return;
      } else {
        setError("");
      }
    }
    if (name==="designation"){
      if (value.length > 20) {
        setError("Speaker designation cannot exceed 20 characters.");
        return;
      } else {
        setError("");
      }
    }
    
    setFormData((prevData) => {
      const updatedSpeakers = [...prevData.speakers];
      updatedSpeakers[index] = { ...updatedSpeakers[index], [name]: value };
      return { ...prevData, speakers: updatedSpeakers };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleNext = () => setFormPage(2);
  const handleBack = () => setFormPage(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("eventDate", formData.eventDate);
    formDataToSend.append("eventTime", formData.eventTime);
    formDataToSend.append("eventPlace", formData.eventPlace);
    formDataToSend.append("invitedPeople", formData.invitedPeople);
    formDataToSend.append("eventImage", formData.eventImage);
    formDataToSend.append("eventDescription", formData.eventDescription);
    formDataToSend.append("numberOfSpeakers", formData.numberOfSpeakers);
    formDataToSend.append("speakers", JSON.stringify(formData.speakers));

    try {
      await onSubmit(formDataToSend);
      resetForm(); // Reset the form after successful submission
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    showForm && (
      <div className="event-form-modal">
        <div className="event-form-content">
          <button
            className="event-close-btn"
            onClick={() => {
              resetForm(); // Reset the form when closing
              toggleForm();
            }}
          >
            ×
          </button>
          <h2>{formPage === 1 ? "Event Details" : "Event Description"}</h2>

          {error && <p className="error-message">{error}</p>} {/* Error Message */}

          {formPage === 1 && (
            <div>
              <div className="event-form-group">
                <label>Event Name:</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="event-form-group">
                <label>Event Date:</label>
                <DatePicker
                  selected={formData.eventDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  required // Prevent selecting past dates
                />
              </div>
              <div className="event-form-group">
                <label>Event Time:</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleTimeChange}
                  required
                />
              </div>
              <div className="event-form-group">
                <label>Event Place:</label>
                <input
                  type="text"
                  name="eventPlace"
                  value={formData.eventPlace}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="event-form-group">
                <label>Number of Invited People:</label>
                <input
                  type="number"
                  name="invitedPeople"
                  value={formData.invitedPeople}
                  onChange={handleInputChange}
                  min="1"
                  required // Prevent negative numbers
                />
              </div>
              <div className="event-form-group">
                <label>Upload Event Image:</label>
                <input
                  type="file"
                  name="eventImage"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="event-form-buttons">
                <button onClick={handleNext} className="event-next-btn">
                  Next
                </button>
              </div>
            </div>
          )}

          {formPage === 2 && (
            <div>
              <div className="event-form-group">
                <label>Event Description:</label>
                <textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="event-form-group">
                <label>Number of Speakers:</label>
                <input
                  type="number"
                  name="numberOfSpeakers"
                  value={formData.numberOfSpeakers}
                  onChange={handleNumberOfSpeakersChange}
                  min="1" // Minimum value is 1
                  max="10"
                  required // Maximum value is 10
                />
              </div>
              {formData.speakers.map((speaker, index) => (
                <div key={index} className="speaker-form-group">
                  <label>Speaker {index + 1} Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={speaker.name}
                    onChange={(e) => handleSpeakerChange(index, e)}
                    required
                  />
                  <label>Speaker {index + 1} Designation:</label>
                  <input
                    type="text"
                    name="designation"
                    value={speaker.designation}
                    onChange={(e) => handleSpeakerChange(index, e)}
                    required
                  />
                </div>
              ))}
              <div className="event-form-buttons">
                <button onClick={handleBack} className="event-back-btn">
                  Back
                </button>
                <button onClick={handleSubmit} className="event-submit-btn">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default EventForm;
