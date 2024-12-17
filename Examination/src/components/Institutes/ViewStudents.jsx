"use client"; // Use client directive for using state and effects

import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Font Awesome Icons

const usersData = [
  {
    name: "Heidi Robinson",
    username: "Heidi",
    email: "jaygamil@inoreti.io",
    registrationDate: "9/11/2019",
  },
  {
    name: "James Rodriguez",
    username: "James2",
    email: "james@example.com",
    registrationDate: "9/5/2019",
  },
  {
    name: "Philip Jones",
    username: "philip2",
    email: "sample@example.com",
    registrationDate: "5/3/2019",
  },
  {
    name: "Sachini Peera",
    username: "sachini",
    email: "jaygamil@inoreti.io",
    registrationDate: "9/5/2019",
  },
  {
    name: "Togar Newton",
    username: "Togar",
    email: "jaygamil@inoreti.io",
    registrationDate: "9/4/2019",
  },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search effect (delays the search by 300ms)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsSearching(false); // Stop loading animation when search is finished
      const filtered = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if the user keeps typing
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredUsers(usersData);
  };

  return (
    <div className="container mx-auto py-8 px-4 text-black">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, username, or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
            }}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {/* Search Icon */}
          <span className="absolute right-3 top-3 text-gray-500">
            {isSearching ? (
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : searchQuery ? (
              <FaTimes className="cursor-pointer" onClick={handleClearSearch} />
            ) : (
              <FaSearch />
            )}
          </span>
        </div>
        {/* Register Button */}
        <button className="w-full md:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg">
          Register
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Date of Registration</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.registrationDate}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <button className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg">
                      Assign Tutors
                    </button>
                    <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg">
                      View Tutors
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (If needed) */}
      <div className="flex justify-between items-center mt-4 space-x-2">
        <button className="w-full md:w-auto text-blue-500">Back</button>
        <button className="w-full md:w-auto text-blue-500">Next</button>
      </div>
    </div>
  );
};

export default Students;
