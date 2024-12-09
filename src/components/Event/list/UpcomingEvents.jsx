import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const UpcomingEvents = ({ selectedDate, showFilteredEvents, setShowFilteredEvents, toggleForm }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (showFilteredEvents && selectedDate) {
      const selectedDateStr = selectedDate.toLocaleDateString(); // Format selected date as string
      const filtered = events.filter(event => {
        const eventDateStr = new Date(event.eventDate).toLocaleDateString(); // Format event date as string
        return eventDateStr === selectedDateStr; // Compare formatted date strings
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedDate, showFilteredEvents, events]);

  const handleViewDetails = (id) => {
    navigate(`/event/${id}`);
    window.scrollTo(0, 0);
  };

  const handleDeleteEvent = async (id) => {
    try {
      // Send DELETE request to backend
      const response = await axios.delete(`http://localhost:5000/api/events/${id}`);
      
      // Log the server response message
      console.log(response.data.message); // 'Event deleted successfully' message from backend
  
      // Remove the event from filteredEvents and events array (frontend only)
      setFilteredEvents((prev) => prev.filter((event) => event._id !== id));
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  

  return (
    <div className="flex flex-col  bg-white p-6 w-full">
      <div className="flex justify-between items-center text-2xl italic">
        <h3>Upcoming Events</h3>
        <div className="flex items-center">
         
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-md ml-8"
            onClick={toggleForm}
          >
            + Add new event
          </button>
        </div>
      </div>
      
      <div className="space-y-4 flex gap-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} className="flex space-x-4  rounded-lg shadow-md overflow-hidden">
              <img
                src={`http://localhost:5000/${event.eventImage}`}
                alt="Event"
                className="w-40 h-40 object-cover mt-4 ml-6"
              />
              <div className="p-6 flex flex-col justify-between w-full">
                <h4 className="text-xl italic">{event.eventName}</h4>
                <div className="mt-6">
                  <p className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(event.eventDate).toLocaleDateString()} | {event.eventTime}
                  </p>
                  <p className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    {event.eventPlace}
                  </p>
                  <p className="flex items-center mb-2">
                    <FaUsers className="mr-2" />
                    Invited: {event.invitedPeople}
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    className="bg-teal-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleViewDetails(event._id)}
                  >
                    View details
                  </button>
                  <button
    className="bg-red-500 text-white px-4 py-2 rounded-md"
    onClick={() => handleDeleteEvent(event._id)} // Handle delete
  >
    Delete
  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
