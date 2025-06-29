import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!storedUser || !token) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-16 mt-12">
      <h1 className="oswald text-4xl md:text-6xl font-bold mb-6">
        Welcome, <span className="text-brightRed">{user.name.toUpperCase()}</span>
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full md:w-[600px] max-w-full mb-10">
        <h2 className="text-xl mb-2">📧 <span className="text-gray-300">{user.email}</span></h2>
        <h3 className="text-md text-gray-400">
          {user.preferences?.tags?.length > 0 && (
            <>
              ✨ Preferences: <span className="text-white">{user.preferences.tags.join(', ')}</span>
            </>
          )}
        </h3>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Trips</h2>
        <p className="text-gray-400">Trip history coming soon...</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 px-6 py-2 rounded-md border border-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
