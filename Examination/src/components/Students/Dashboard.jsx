import React from 'react';

const Dashboard = () => {
  return (
    <div className="w-full p-6">
      {/* Search and Notification */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border px-4 py-2 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="material-icons text-black">notifications</span>
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-1 text-white">1</span>
          </div>
          <span className="material-icons text-black">email</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="bg-purple-500 text-white rounded-lg flex p-6 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Samiksha Juwar</h2>
          <p className="text-sm">samiksha03@gmail.com</p>
        </div>
        <div className="rounded-full bg-black p-1">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-black mb-4">
          Categories <span className="material-icons text-black">expand_more</span>
        </h3>
        <ul className="space-y-4">
          {['Python', 'Java', 'MongoDB', 'SQL', 'AI'].map((category, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full bg-orange-200"></span>
              <span className="bg-orange-100 px-3 py-1 rounded-md text-black">{category}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          Enroll in Course
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
