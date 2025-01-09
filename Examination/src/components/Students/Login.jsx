'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      const response = await axios.post(`${baseUrl}/api/students/login/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      if (result.status === 'success') {
        const { full_name } = result.data;
        alert('Login successful!');
        // Redirect to dynamic route
        router.push(`/Students/${encodeURIComponent(full_name)}/Dashboard`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Student Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
          <p className="text-center mt-2 text-black">
            Not registered? <a href="http://localhost:3000/Students/Registration" className="text-indigo-600 hover:text-indigo-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
