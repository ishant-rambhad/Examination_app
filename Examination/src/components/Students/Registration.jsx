'use client';
import React, { useState } from 'react';
import axios from 'axios';

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
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
      const response = await axios.post(`${baseUrl}/api/students/registration/`, {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        date_of_birth: formData.dateOfBirth,
        identity_proof_type: formData.identityProofType,
        identity_proof_number: formData.identityProofNumber,
        course: formData.course,
        mobile_number: formData.mobileNumber
      });


      if (response.status === 200) {
        alert('Registration successful!');
        Router.push(`Students/Login`)
      } else {
        alert(`Error: ${response.data.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Email is Already Registered.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Student Registration
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            name="fullName"
            type="text"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            name="dateOfBirth"
            type="date"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="mobileNumber"
            type="tel"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <select
            name="identityProofType"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            value={formData.identityProofType}
            onChange={handleChange}
          >
            <option value="">Select Identity Proof</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
            <option value="Passport">Passport</option>
          </select>
          <input
            name="identityProofNumber"
            type="text"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Identity Proof Number"
            value={formData.identityProofNumber}
            onChange={handleChange}
          />
          <input
            name="course"
            type="text"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            required
            className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-black"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{" "}
          <a href="/Students/Login" className="text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
};

export default StudentRegistration;
