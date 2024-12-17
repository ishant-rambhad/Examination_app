import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Or use localStorage if you're using that

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from cookies (or localStorage)
    Cookies.remove('token'); // Remove the JWT token from cookies

    // Redirect to the Students route (or login page)
    router.push('/Students');
  };

  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col">
      {/* Top Section - Profile */}
      <div className="flex flex-col items-center mt-6 mb-6">
        <img
          className="w-24 h-24 rounded-full"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
        <span className="text-sm text-gray-400">Student</span>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 px-4 space-y-4">
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
        >
          <span className="text-sm font-medium">Courses</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
        >
          <span className="text-sm font-medium">My Learning</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
        >
          <span className="text-sm font-medium">Performance</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
        >
          <span className="text-sm font-medium">Profile</span>
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
        >
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
