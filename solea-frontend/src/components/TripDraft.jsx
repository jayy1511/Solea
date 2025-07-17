import React, { useEffect, useState } from "react";
import axios from "axios";

const TripDraft = ({ userId }) => {
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/redis/draft/${userId}`);
        setDraft(res.data);
        setTitle(res.data.title || "");
      } catch (err) {
        console.log("No draft found in Redis");
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [userId]);

  const saveDraft = async () => {
    try {
      const token = localStorage.getItem("token");
      const tripData = {
        title,
        cities: [],
        hotels: [],
        isConfirmed: false,
      };

      await axios.post(
        "http://localhost:5000/api/redis/draft",
        {
          userId,
          draft: tripData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Trip draft saved!");
    } catch (err) {
      console.error("Failed to save draft", err);
    }
  };

  const clearDraft = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/redis/draft/${userId}`);
      setDraft(null);
      alert("Draft cleared.");
    } catch (err) {
      console.error("Failed to clear draft", err);
    }
  };

  if (loading) return <p className="text-white">Loading draft...</p>;

  return (
    <div className="bg-zinc-800 text-white p-6 rounded-xl mt-6">
      <h2 className="oswald text-xl mb-4">📝 Trip Draft</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Trip Title"
        className="oswald text-black px-4 py-2 rounded w-full mb-3"
      />

      <div className="flex gap-4">
        <button
          onClick={saveDraft}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Save Draft
        </button>

        <button
          onClick={clearDraft}
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          Clear Draft
        </button>
      </div>

      {draft && (
        <div className="mt-4 text-sm text-gray-300">
          <p>Last saved draft: <strong>{draft.title}</strong></p>
        </div>
      )}
    </div>
  );
};

export default TripDraft;
