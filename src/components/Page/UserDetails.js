// // src/components/UserDetails.jsx

// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import './UserDetails.css';  // You can style the page accordingly

// const UserDetails = () => {
//   const { username } = useParams(); // Get the username from URL params
//   const history = useHistory();
//   const [userData, setUserData] = useState({
//     user_name: '',
//     user_email: '',
//     user_mobile: '',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedData, setUpdatedData] = useState({
//     user_name: '',
//     user_email: '',
//     user_mobile: '',
//   });

//   useEffect(() => {
//     // Fetch user data from backend API
//     axios
//       .get(`/api/users/${username}`)
//       .then((response) => {
//         setUserData(response.data);
//         setUpdatedData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [username]);

//   const handleUpdate = () => {
//     // Update user data on backend
//     axios
//       .put(`/api/users/${username}`, updatedData)
//       .then((response) => {
//         setUserData(updatedData);
//         setIsEditing(false); // Exit editing mode after saving
//       })
//       .catch((error) => {
//         console.error('Error updating user data:', error);
//       });
//   };

//   return (
//     <div className="user-details">
//       <h1>User Details: {userData.user_name}</h1>

//       {isEditing ? (
//         <div className="edit-form">
//           <div>
//             <label htmlFor="user_name">Username</label>
//             <input
//               type="text"
//               id="user_name"
//               value={updatedData.user_name}
//               onChange={(e) => setUpdatedData({ ...updatedData, user_name: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="user_email">Email</label>
//             <input
//               type="email"
//               id="user_email"
//               value={updatedData.user_email}
//               onChange={(e) => setUpdatedData({ ...updatedData, user_email: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="user_mobile">Mobile</label>
//             <input
//               type="text"
//               id="user_mobile"
//               value={updatedData.user_mobile}
//               onChange={(e) => setUpdatedData({ ...updatedData, user_mobile: e.target.value })}
//             />
//           </div>
//           <button onClick={handleUpdate}>Save Changes</button>
//           <button onClick={() => setIsEditing(false)}>Cancel</button>
//         </div>
//       ) : (
//         <div className="user-info">
//           <p><strong>Username:</strong> {userData.user_name}</p>
//           <p><strong>Email:</strong> {userData.user_email}</p>
//           <p><strong>Mobile:</strong> {userData.user_mobile}</p>
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//         </div>
//       )}

//       <button onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
//     </div>
//   );
// };

// export default UserDetails;



import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UserDetails.css'; // You can style the page accordingly

const UserDetails = () => {
  const { username } = useParams(); // Get the username from URL params
  const history = useHistory();

  // Mock data
  const mockUsers = {
    johndoe: { user_name: 'John Doe', user_email: 'johndoe@example.com', user_mobile: '1234567890' },
    janedoe: { user_name: 'Jane Doe', user_email: 'janedoe@example.com', user_mobile: '0987654321' },
  };

  const [userData, setUserData] = useState({
    user_name: '',
    user_email: '',
    user_mobile: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    user_name: '',
    user_email: '',
    user_mobile: '',
  });

  // Simulate fetching data
  useEffect(() => {
    const user = mockUsers[username];
    if (user) {
      setUserData(user);
      setUpdatedData(user);
    } else {
      console.error('User not found!');
    }
  }, [username]);

  const handleUpdate = () => {
    // Simulate updating data locally
    setUserData(updatedData);
    setIsEditing(false); // Exit editing mode
    alert('User details updated successfully!');
  };

  return (
    <div className="user-details">
      <h1>User Details: {userData.user_name}</h1>

      {isEditing ? (
        <div className="edit-form">
          <div>
            <label htmlFor="user_name">Username</label>
            <input
              type="text"
              id="user_name"
              value={updatedData.user_name}
              onChange={(e) => setUpdatedData({ ...updatedData, user_name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              id="user_email"
              value={updatedData.user_email}
              onChange={(e) => setUpdatedData({ ...updatedData, user_email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="user_mobile">Mobile</label>
            <input
              type="text"
              id="user_mobile"
              value={updatedData.user_mobile}
              onChange={(e) => setUpdatedData({ ...updatedData, user_mobile: e.target.value })}
            />
          </div>
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="user-info">
          <p><strong>Username:</strong> {userData.user_name}</p>
          <p><strong>Email:</strong> {userData.user_email}</p>
          <p><strong>Mobile:</strong> {userData.user_mobile}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}

      <button onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default UserDetails;
