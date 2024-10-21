import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './Home'; // Import Home component

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />, // Main layout component
    children: [
      {
        path: '/',
        element: <Home />, // Home page for displaying blogs
      },
    
    ],
  },
]);

// Main layout component
function Main() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-5">My Blog</h1>
      <Outlet /> {/* Render the matched child route */}
    </div>
  );
}

// App component to provide the routing context
function App() {
  return <RouterProvider router={router} />;
}

export default App;
