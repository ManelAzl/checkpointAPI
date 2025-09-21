// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  // Step 5: Use useState to create state for users
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 4: Use useEffect to fetch data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // API endpoint from jsonplaceholder
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setListOfUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means run once on mount

  // Step 6: Display loading, error, or data
  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list-container">
      <h1>List of Users</h1>
      <div className="users-grid">
        {/* Step 7: Map through listOfUser to display each user */}
        {listOfUser.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <div className="address">
              <strong>Address:</strong>
              <p>{user.address.street}, {user.address.city}</p>
              <p>{user.address.zipcode}</p>
            </div>
            <div className="company">
              <strong>Company:</strong>
              <p>{user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;