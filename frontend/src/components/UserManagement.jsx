import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#003366' }}>User Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#0056b3', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '15px' }}>ID</th>
            <th style={{ padding: '15px' }}>Name</th>
            <th style={{ padding: '15px' }}>Email</th>
            <th style={{ padding: '15px' }}>Role</th>
            <th style={{ padding: '15px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={{ padding: '15px' }}>{user.id}</td>
              <td style={{ padding: '15px' }}>{user.name}</td>
              <td style={{ padding: '15px' }}>{user.email}</td>
              <td style={{ padding: '15px' }}>{user.role}</td>
              <td style={{ padding: '15px' }}>
                <span style={{ 
                  padding: '5px 10px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  backgroundColor: user.status === 'Active' ? '#d4edda' : '#fff3cd',
                  color: user.status === 'Active' ? '#155724' : '#856404'
                }}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}