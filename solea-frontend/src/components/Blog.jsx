import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../config';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div id="blog" className="bg-black text-white px-5 md:px-32 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="oswald text-6xl font-bold">Blogs</h1>
        <button className="oswald px-6 py-3 text-white border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-md">
          View All
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center w-full h-[500px] rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${blog.image})` }}
          >
            <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-md flex gap-2 items-center shadow-lg oswald">
              <span>&bull;</span>
              <span>{blog.category}</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
              <span>&bull;</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white px-4 py-3 rounded-md backdrop-blur-sm">
              <h2 className="text-lg font-semibold oswald">{blog.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
