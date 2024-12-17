// components/FloatingSidebar.js
"use client"
import React, { useState, useEffect } from 'react';
import { faBook, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';



import {
  faBars,
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
  faSun,
  faMoon,
  faUsers,
  faChevronDown,
  faPlus,
  faEye,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

const FloatingSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [theme, setTheme] = useState('light');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [dropdownStudentsOpen, setDropdownStudentsOpen] = useState(false);
  const [dropdownEmployeeOpen, setDropdownEmployeeOpen] = useState(false);
  const [showStudentTooltip, setShowStudentTooltip] = useState(false);
  const [showEmployeeTooltip, setShowEmployeeTooltip] = useState(false);

  const toggleSidebar = () => setExpanded(!expanded);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleStudentsDropdown = () =>
    setDropdownStudentsOpen(!dropdownStudentsOpen);
  const toggleEmployeeDropdown = () =>
    setDropdownEmployeeOpen(!dropdownEmployeeOpen);

  // Handle auto-hide on scroll
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setScrollPosition(currentScrollPos);
  };

  // Track scroll to auto-hide
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Drag & Drop
  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    const sidebar = e.target;
    const { clientX, clientY } = e;
    sidebar.style.top = `${clientY}px`;
    sidebar.style.left = `${clientX}px`;
  };

  // Calculate the height of the sidebar based on dropdowns
  const calculateSidebarHeight = () => {
    let baseHeight = 90; // base sidebar height in vh
    if (dropdownStudentsOpen) baseHeight += 10; // add 10vh when Students dropdown is open
    if (dropdownEmployeeOpen) baseHeight += 10; // add 10vh when Employees dropdown is open
    return baseHeight;
  };

  return (
    <div
      className={`fixed ${isDragging ? '' : 'transition-all duration-300 ease-in-out'
        } ${expanded ? 'w-64 sm:w-72' : 'w-16 sm:w-20'} bg-${theme === 'light' ? 'white' : 'gray-800'
        } shadow-lg text-${theme === 'light' ? 'black' : 'white'} rounded-xl z-40 flex flex-col justify-between`}
      style={{
        top: scrollPosition > 100 ? '-80px' : '20px',
        left: '20px',
        height: `${calculateSidebarHeight()}vh`,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Top Section: Sidebar Toggle Button */}
      <div className="relative p-3">
        <button
          className="absolute top-2 right-2 text-lg p-1 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-all"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Sidebar Content */}
        <div className="mt-12">
          <nav>
            <ul className="space-y-4">
              <li className="group relative transition-transform duration-200 ease-in-out">
                <Link href="/Institutes/i" className={`flex items-center p-3 text-sm sm:text-base lg:text-lg hover:bg-gray-100 rounded-md transition-all text-${theme === 'light' ? 'black' : 'white'}`}>
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  {expanded && <span>Dashboard</span>}
                </Link>
                {!expanded && (
                  <span className={`absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Dashboard
                  </span>
                )}
              </li>

              {/* Students Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center justify-between w-full text-sm sm:text-base lg:text-lg py-3 px-4 mb-4 rounded hover:bg-gray-100 transition-colors duration-300 focus:outline-none text-${theme === 'light' ? 'black' : 'white'}`}
                  onClick={toggleStudentsDropdown}
                  onMouseEnter={() => !expanded && setShowStudentTooltip(true)}
                  onMouseLeave={() => setShowStudentTooltip(false)}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    {expanded && <span className="ml-3 hidden sm:inline">Students</span>}
                  </div>
                  {expanded && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`ml-auto transition-transform duration-300 ${dropdownStudentsOpen ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </button>
                {!expanded && showStudentTooltip && (
                  <div className="absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md">
                    Students
                  </div>
                )}
                <div
                  className={`ml-6 bg-gray-100 rounded shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${dropdownStudentsOpen ? 'max-h-40' : 'max-h-0'
                    }`}
                >
                  {dropdownStudentsOpen && (
                    <>
                      <Link
                        href="/Institutes/i/Students"
                        className={`block py-2 px-4 hover:bg-gray-200 transition-colors duration-300 flex items-center text-${theme === 'light' ? 'black' : 'white'}`}
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Student
                      </Link>
                      <Link
                        href="/Institutes/i/ViewStudents"
                        className={`block py-2 px-4 hover:bg-gray-200 transition-colors duration-300 flex items-center text-${theme === 'light' ? 'black' : 'white'}`}
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        View Students
                      </Link>
                    </>
                  )}
                </div>
              </li>

              {/* Employee Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center justify-between w-full text-sm sm:text-base lg:text-lg py-3 px-4 mb-4 rounded hover:bg-gray-100 transition-colors duration-300 focus:outline-none text-${theme === 'light' ? 'black' : 'white'}`}
                  onClick={toggleEmployeeDropdown}
                  onMouseEnter={() => !expanded && setShowEmployeeTooltip(true)}
                  onMouseLeave={() => setShowEmployeeTooltip(false)}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    {expanded && <span className="ml-3 hidden sm:inline">Employees</span>}
                  </div>
                  {expanded && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`ml-auto transition-transform duration-300 ${dropdownEmployeeOpen ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </button>
                {!expanded && showEmployeeTooltip && (
                  <div className="absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md">
                    Employees
                  </div>
                )}
                <div
                  className={`ml-6 bg-gray-100 rounded shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${dropdownEmployeeOpen ? 'max-h-40' : 'max-h-0'
                    }`}
                >
                  {dropdownEmployeeOpen && (
                    <>
                      <Link
                        href="/Institutes/i/Employee"
                        className={`block py-2 px-4 hover:bg-gray-200 transition-colors duration-300 flex items-center text-${theme === 'light' ? 'black' : 'white'}`}
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Employee
                      </Link>
                      <a
                        href="#"
                        className={`block py-2 px-4 hover:bg-gray-200 transition-colors duration-300 flex items-center text-${theme === 'light' ? 'black' : 'white'}`}
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        View All Employees
                      </a>
                      <a
                        href="#"
                        className={`block py-2 px-4 hover:bg-gray-200 transition-colors duration-300 flex items-center text-${theme === 'light' ? 'black' : 'white'}`}
                      >
                        <FontAwesomeIcon icon={faTasks} className="mr-2" />
                        Assign Task
                      </a>
                    </>
                  )}
                </div>
              </li>

              {/* Curriculum Option */}
              <li className="group relative transition-transform duration-200 ease-in-out">
                <a
                  href="#"
                  className={`flex items-center p-3 text-sm sm:text-base lg:text-lg hover:bg-gray-100 rounded-md transition-all text-${theme === 'light' ? 'black' : 'white'}`}
                >
                  <FontAwesomeIcon icon={faBook} className="mr-2" />
                  {expanded && <span>Curriculum</span>}
                </a>
                {!expanded && (
                  <span className={`absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Curriculum
                  </span>
                )}
              </li>

              {/* Notes Option */}
              <li className="group relative transition-transform duration-200 ease-in-out">
                <a
                  href="#"
                  className={`flex items-center p-3 text-sm sm:text-base lg:text-lg hover:bg-gray-100 rounded-md transition-all text-${theme === 'light' ? 'black' : 'white'}`}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                  {expanded && <span>Notes</span>}
                </a>
                {!expanded && (
                  <span className={`absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Notes
                  </span>
                )}
              </li>

              {/* Settings Option */}
              <li className="group relative transition-transform duration-200 ease-in-out">
                <a
                  href="#"
                  className={`flex items-center p-3 text-sm sm:text-base lg:text-lg hover:bg-gray-100 rounded-md transition-all text-${theme === 'light' ? 'black' : 'white'}`}
                >
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  {expanded && <span>Settings</span>}
                </a>
                {!expanded && (
                  <span className={`absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Settings
                  </span>
                )}
              </li>

              {/* Logout Option */}
              <li className="group relative transition-transform duration-200 ease-in-out">
                <Link
                  href="/Institutes/i/Logout"
                  className={`flex items-center p-3 text-sm sm:text-base lg:text-lg hover:bg-gray-100 rounded-md transition-all text-${theme === 'light' ? 'black' : 'white'}`}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  {expanded && <span>Logout</span>}
                </Link>

                {!expanded && (
                  <span className={`absolute left-16 top-3 p-2 text-xs sm:text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Logout
                  </span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Section: Theme Toggle */}
      <div className="p-4">
        <button
          className="text-xs p-0.5 w-8 h-8 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-all"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
        </button>
      </div>
    </div>
  );
};

export default FloatingSidebar;
