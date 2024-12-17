'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Use axios for the POST request
      const response = await axios.post('http://127.0.0.1:8000/api/students/Registration/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        alert('Registration successful!');
      } else {
        alert(`Error: ${response.data.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Student Registration
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
            <select
              name="identityProofType"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.identityProofType}
              onChange={handleChange}
            >
              <option value="">Select Identity Proof</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
              <option value="Passport">Passport</option>
            </select>

            {/* Identity Proof Number */}
            <input
              name="identityProofNumber"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Identity Proof Number"
              value={formData.identityProofNumber}
              onChange={handleChange}
            />

            {/* Course */}
            <input
              name="course"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Confirm Password */}
            <input
              name="confirmPassword"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
