// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("http://localhost:5000/api/users");
//       setUsers(response.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to fetch user data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-4 text-xl text-gray-600">Loading users...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error! </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Registered Users</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <div 
//             key={user._id} 
//             className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//           >
//             <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800">{user.user_name}</h2>
//               <p className="text-sm text-gray-500">{user.user_email}</p>
//             </div>
//             <div className="p-6">
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <span className="font-medium text-gray-700 mr-2 w-20">ID:</span>
//                   <span className="text-gray-600 truncate">{user._id}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium text-gray-700 mr-2 w-20">Mobile:</span>
//                   <span className="text-gray-600">{user.user_mobile}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;




import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-xl text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Registered Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{user.user_name}</h2>
              <p
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  maxWidth: "100%",
                  display: user.user_email.length > 20 ? "block" : "inline",
                }}
                className="text-sm text-gray-500"
              >
                {user.user_email}
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2 w-20">ID:</span>
                  <span className="text-gray-600 truncate">{user._id}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2 w-20">Mobile:</span>
                  <span className="text-gray-600">{user.user_mobile}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
