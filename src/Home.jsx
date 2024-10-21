import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Error fetching blogs');
    }
  };

  const createBlog = async (newBlog) => {
    try {
      const response = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      toast.success('Blog created successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Error creating blog');
    }
  };

  const updateBlog = async (updatedBlog) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${editingBlog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlog),
      });
      if (!response.ok) {
        throw new Error('Failed to update blog');
      }
      toast.success('Blog updated successfully!');
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Error updating blog');
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Error deleting blog');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, content, author };

    if (editingBlog) {
      updateBlog(newBlog);
    } else {
      createBlog(newBlog);
    }

    // Reset form fields
    setTitle('');
    setContent('');
    setAuthor('');
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white border border-gray-300 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Minimal Blog</h1>

        {/* Create New Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-black"
              placeholder="Blog title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-black"
              rows="4"
              placeholder="Blog content"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-black"
              placeholder="Author name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            {editingBlog ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>

        {/* Blog Posts Section */}
        <h2 className="text-2xl font-semibold text-center text-gray-900 mt-10 mb-4">Blog Posts</h2>
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available yet.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h3
                  className="text-lg font-semibold text-gray-800 cursor-pointer"
                >
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500 mt-4">
                  <small>Published on: {new Date(blog.createdAt).toLocaleDateString()}</small>
                </p>
                <p className="text-gray-600 mt-2">{blog.author}</p>
                <div className="mt-4">
                  <button
                    className="text-blue-500 hover:underline mr-4"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer /> {/* Toast Container */}
    </div>
  );
};

export default App;
