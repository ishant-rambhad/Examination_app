"use client"
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024 && isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  useEffect(() => {
    const notificationIcon = document.querySelector('.notification-icon');
    const interval = setInterval(() => {
      if (notificationIcon) {
        notificationIcon.classList.add('scale-110');
        setTimeout(() => notificationIcon.classList.remove('scale-110'), 200);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="flex inset-0 bg-indigo-900/50 z-40 opacity-100 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Header */}
      <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
          <button
            className="p-2 lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="material-icons-outlined text-2xl">menu</span>
          </button>
          <div className="text-xl font-bold text-blue-900">
            Admin<span className="text-indigo-800">Panel</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">search</span>
            <span className="material-icons-outlined notification-icon p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">notifications</span>
            <img
              className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
              src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
              alt="Profile"
            />
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="pt-16 max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static w-[240px]  h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] transform transition-transform duration-300 z-50 overflow-y-auto p-4 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
              <span className="material-icons-outlined mr-2">dashboard</span>
              Home
              <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
              <span className="material-icons-outlined mr-2">tune</span>
              Some menu item
              <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
              <span className="material-icons-outlined mr-2">file_copy</span>
              Another menu item
              <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
              <span className="material-icons-outlined mr-2">face</span>
              Profile
              <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
              <span className="material-icons-outlined mr-2">settings</span>
              Settings
              <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
              <span className="material-icons-outlined mr-2">power_settings_new</span>
              Log out
              <span className="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Welcome <br />
                <strong>Dash</strong>
              </h2>
              <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">01:51</span>
            </div>

            <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Inbox <br />
                <strong>23</strong>
              </h2>
              <a
                href="#"
                className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
              >
                See messages
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-indigo-800">Stats Card {item}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
