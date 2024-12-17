'use client';
import React, { useState } from 'react';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    mobileNumber: '',
    identityProofType: '',
    identityProofNumber: '',
    course: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Institutes Registration
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <input
              name="fullName"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {/* Date of Birth */}
            <input
              name="dateOfBirth"
              type="text"
              onFocus={(e) => (e.target.type = 'date')}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Mobile Number */}
            <input
              name="mobileNumber"
              type="tel"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
            />

            {/* Identity Proof Type */}
            <div className="relative">
              <select
                name="identityProofType"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-400 placeholder-gray-400"
                value={formData.identityProofType}
                onChange={handleChange}
              >
                <option value="">Select Identity Proof</option>
                <option value="aadharcard">Aadhar Card</option>
                <option value="drivinglicence">Driving Licence</option>
                <option value="pancard">PAN Card</option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </span>
            </div>

            {/* Identity Proof Number */}
            <input
              name="identityProofNumber"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Identity Proof Number"
              value={formData.identityProofNumber}
              onChange={handleChange}
            />

            {/* Course */}
            <div className="relative">
              <select
                name="course"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-400 placeholder-gray-400"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="javascript">JavaScript</option>
                <option value="php">PHP</option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </span>
            </div>

            {/* Password */}
            <input
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Confirm Password */}
            <input
              name="confirmPassword"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <p className="text-center mt-2 text-black">
            Already registered? <a href="http://localhost:3000/Institutes/Login" className="text-indigo-600 hover:text-indigo-500">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
