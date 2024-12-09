import React, { useState } from 'react';
import Logo from "../imgs/logo.png";
import EventsTable from './Event/EventTable';
import EventPage from './Event/EventPage';
import UserList from './UserList';
import Popup from './ProductList';
import AnalyticsDashboard from './AnalyticsDashboard';
import ProductAnalyticsDashboard from './ProductAnalyticsDashboard'
import { Router, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };



  const navigate = useNavigate();
    const handleSignOut = () => {
      // Clear user data from localStorage
      localStorage.removeItem('user'); // Adjust the key if necessary

      // Redirect to home page
      window.location.reload(); 
      
    };


  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <ProductAnalyticsDashboard/>;
        
      case 'Events':
        return <EventsTable/>;
      case 'Users':
        return <UserList/>
      case 'Products':
        return <Popup/>;
      case 'Analytics':
        return <AnalyticsDashboard/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="bg-pink-100 p-4 flex flex-col justify-between h-screen overflow-auto fixed top-0 left-0">

        <div className=''>
          <div className="text-gray-600 font-bold m-10"><div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Gyaan<span>B</span>azaar
          </span>
        </div></div>
          <ul className="space-y-4">
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeComponent === 'Dashboard' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => handleComponentChange('Dashboard')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeComponent === 'Events' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => handleComponentChange('Events')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Events</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeComponent === 'Users' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => handleComponentChange('Users')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Users</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeComponent === 'Products' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => handleComponentChange('Products')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Products</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeComponent === 'Analytics' ? 'text-blue-500' : 'text-gray-600'
              }`}
              onClick={() => handleComponentChange('Analytics')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Analytics</span>
            </li>
          </ul>
        </div>
        <div
      className="flex items-center space-x-2 cursor-pointer text-gray-600"
      onClick={handleSignOut}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span>Sign Out</span>
    </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white h-screen ml-72">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;