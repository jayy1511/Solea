import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const preferenceCategories = {
  "Adventure & Outdoors": ["adventure", "hiking", "diving", "wildlife", "outdoor", "water sports"],
  "Spiritual & Wellness": ["buddhist", "spiritual", "zen", "yoga", "wellness"],
  "Nature & Scenery": ["scenic", "mountains", "beaches", "lakeside", "coastal", "riverside", "valley", "nature", "tropical", "islands"],
  "Culture & History": ["historic", "cultural", "medieval", "ancient", "UNESCO", "temples", "museums", "colonial"],
  "Fun & Entertainment": ["nightlife", "festival", "carnival", "shopping", "street food", "street art", "film festival", "theme parks"],
  "Romantic & Relaxing": ["romantic", "honeymoon", "relaxation", "peaceful", "spa", "resort"],
  "Urban & Modern": ["urban", "modern", "cosmopolitan", "fashion", "business", "technology"],
  "Food & Drink": ["culinary", "gastronomy", "wine", "tea", "coffee", "seafood"]
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setSelectedTags(res.data.preferences?.tags || []);
        setTrips(res.data.trips || []);
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const savePreferences = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5000/api/users/preferences', {
        tags: selectedTags,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Preferences updated.");
    } catch (err) {
      console.error("Error saving preferences", err);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-16 mt-12">
      <h1 className="oswald text-4xl md:text-6xl font-bold mb-6">
        Welcome, <span className="text-brightRed">{user.name.toUpperCase()}</span>
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full md:w-[600px] max-w-full mb-10">
        <h2 className="text-xl mb-2">📧 <span className="text-gray-300">{user.email}</span></h2>
        <div className="mt-4">
          <h3 className="text-md mb-2 text-gray-400">Your Preferences:</h3>
          {Object.entries(preferenceCategories).map(([category, tags]) => (
            <div key={category} className="mb-3">
              <h4 className="text-white font-semibold">{category}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`text-sm px-3 py-1 rounded-full border ${
                      selectedTags.includes(tag)
                        ? "bg-white text-black"
                        : "border-white text-white"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={savePreferences}
            className="mt-6 px-6 py-2 border border-white hover:bg-white hover:text-black transition rounded"
          >
            Save Preferences
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Confirmed Trips</h2>
        {trips.length > 0 ? (
          <div className="space-y-4">
            {trips.filter(t => t.isConfirmed).map(trip => (
              <div key={trip._id} className="p-4 bg-zinc-800 rounded">
                <h3 className="text-xl font-medium">{trip.title}</h3>
                <p className="text-sm text-gray-400">Cities: {trip.cities.map(c => c.name).join(', ')}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No confirmed trips yet.</p>
        )}
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
