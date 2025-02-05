// Sidebar.jsx
"use client"
import React from 'react';
import {
  LayoutDashboard,
  Sliders,
  FileText,
  UserCircle,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside
      className={`fixed lg:static w-[240px] h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] transform transition-transform duration-300 z-50 overflow-y-auto p-4 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <a href="/Admin/default/Dashboard" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <LayoutDashboard className="h-5 w-5 mr-2" />
          Home
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
        <a href="/Admin/default/AddCourse" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <LayoutDashboard className="h-5 w-5 mr-2" />
          Course
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
        <a href="/Admin/default/AddQuestions" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <LayoutDashboard className="h-5 w-5 mr-2" />
          Add Questions
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <Sliders className="h-5 w-5 mr-2" />
          Some menu item
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <FileText className="h-5 w-5 mr-2" />
          Another menu item
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <UserCircle className="h-5 w-5 mr-2" />
          Profile
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <Settings className="h-5 w-5 mr-2" />
          Settings
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
        <a href="/Admin/Login" className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <LogOut className="h-5 w-5 mr-2" />
          Log out
          <ChevronRight className="h-5 w-5 ml-auto" />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;