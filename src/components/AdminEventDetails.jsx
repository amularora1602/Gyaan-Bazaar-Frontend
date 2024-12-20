import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Event/viewDetails/EventDetails.css";

const EventDetailsAdmin = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [email, setEmail] = useState('');
  const [universityRollNumber, setUniversityRollNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBackClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseForm = () => {
    setShowRegistrationForm(false);
    setEmail('');
    setUniversityRollNumber('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if the user is already registered for this event
      const checkResponse = await axios.get(`http://localhost:5000/api/registrations/check`, {
        params: { email, eventId: event._id },
      });

      if (checkResponse.data.isRegistered) {
        alert('You are already registered for this event.');
        return;
      }

      // Proceed with registration
      const response = await axios.post('http://localhost:5000/api/registrations', {
        eventId: event._id,
        email,
        universityRollNumber,
      });

      if (response.status === 201) {
        // Send confirmation email
        // await axios.post('http://localhost:5000/api/registrations/send-email', {
        //   email,
        // });
  
        alert('Registration successful! ');
        handleCloseForm();
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('An error occurred while registering.');
    }
  };

  if (!event) return <p className="event-loading">Loading...</p>;

  return (
    <div className="custom-event-page">
      <div className="custom-header-container">
        <button className="custom-back-button" onClick={handleBackClick}>
          &larr;
        </button>
      </div>
      <div className="custom-header">
        <h1 className="custom-event-name">{event.eventName}</h1>
        <div className="custom-date-time">
          <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
          <p>Time: {event.eventTime}</p>
        </div>
      </div>
      <img
        src={`http://localhost:5000/${event.eventImage}`}
        alt="Event"
        className="custom-event-image"
      />
      <div className="custom-bottom-details">
        <div className="custom-details">
          <div className="custom-description">
            <p><strong>Description about the event:</strong><br/>{event.eventDescription}</p>
          </div>
          <div className="custom-info">
            <p>
              <strong>When and Where:</strong>
            </p>
            <p>Location: {event.eventPlace}</p>
            <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
          </div>
        </div>
        {/* <div className="custom-booking">
          <p className="custom-reservation-line">Be part of something special. Secure your spot now!</p>
          <button className="custom-book-spot-button" onClick={handleRegisterClick}>
            Register Now
          </button>
        </div> */}
      </div>
      
      <div className="speaker-section">
        <div className="speaker-header">
          <h2>Meet the Speakers</h2>
          <p>
            Our bench of speakers includes some well-established and successful
            designers who are known to be ruling the industry for years. Join
            the seminar and take a step closer to being an expert.
          </p>
        </div>
        <div className="speaker-cards">
          {event.speakers && event.speakers.length > 0 ? (
            event.speakers.map((speaker) => (
              <div className="speaker-card" key={speaker.name}>
                <h2>Name:{speaker.name}</h2>
                <p>Designation:{speaker.designation}</p>
              </div>
            ))
          ) : (
            <p>No speakers listed for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsAdmin;
