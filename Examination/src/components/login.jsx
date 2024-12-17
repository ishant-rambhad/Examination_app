"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; // Using cookies instead of localStorage for security

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Make an API request to login and obtain JWT token
      const response = await axios.post("/api/students/login", { email, password });

      if (response.status === 200) {
        const { token } = response.data;

        // Save JWT token in a secure cookie (expires in 1 hour)
        Cookies.set("token", token, { expires: 1 / 24 }); // Expires in 1 hour

        // Redirect to the student dashboard or desired location
        router.push(`/Students/${email}`);
      } else {
        setError("Incorrect email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push(`/Students/${email}`); // Redirect if already logged in
    }
  }, [router, email]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-black text-white font-bold rounded-lg hover:from-green-400 hover:to-purple-600 focus:outline-none"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// "use client";
// import React, { useState } from "react";

// const Login = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign up
//   const [profession, setProfession] = useState(""); // State for profession
//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

//   const handleToggle = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form submitted");
//   };

//   const toggleSignUp = () => {
//     setIsSignUp(!isSignUp);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-6 text-gray-800">
//             {isSignUp ? "Sign Up" : "Login"}
//           </h1>
//           {isSignUp && (
//             <>
//               <div className="relative mb-4">
//                 <i className="fa fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   required
//                   className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                 />
//               </div>
//               <div className="relative mb-4">
//                 <i className="fa fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <input
//                   type="email"
//                   placeholder="Gmail"
//                   required
//                   className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                 />
//               </div>
//               <div className="relative mb-4">
//                 <i className="fa fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <input
//                   type="date"
//                   required
//                   className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                 />
//               </div>
//               <div className="relative mb-4">
//                 <i className="fa fa-briefcase absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <select
//                   value={profession}
//                   onChange={(e) => setProfession(e.target.value)}
//                   required
//                   className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                 >
//                   <option value="" disabled>
//                     Select Profession
//                   </option>
//                   <option value="Student">Student</option>
//                   <option value="Employee">Employee</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div className="relative mb-4">
//                 <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="New Password"
//                   required
//                   className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                 />
//                 <i
//                   className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
//                   onClick={togglePasswordVisibility}
//                 ></i>
//               </div>
//               <div className="relative mb-6">
//                 <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm Password"
//                   required
//                   className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                 />
//                 <i
//                   className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
//                   onClick={togglePasswordVisibility}
//                 ></i>
//               </div>
//             </>
//           )}
//           <form onSubmit={handleSubmit}>
//             {!isSignUp && (
//               <>
//                 <div className="relative mb-4">
//                   <i className="fa fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     required
//                     className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                   />
//                 </div>
//                 <div className="relative mb-6">
//                   <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     required
//                     className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
//                   />
//                   <i
//                     className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
//                     onClick={togglePasswordVisibility}
//                   ></i>
//                 </div>
//               </>
//             )}
//             <button
//               type="submit"
//               className="w-full py-2 mb-4 bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition duration-300"
//             >
//               {isSignUp ? "Sign Up" : "Login"}
//             </button>
//           </form>
//           <div className="flex items-center justify-between mb-4">
//             <hr className="w-full border-t border-gray-300" />
//             <span className="px-2 text-gray-400">OR</span>
//             <hr className="w-full border-t border-gray-300" />
//           </div>
//           <div className="flex flex-col space-y-4">
//             <button className="w-full py-2 bg-white text-black rounded-lg hover:bg-red-50 transition duration-300 flex items-center justify-center">
//               <img
//                 src="/images/google.png"
//                 alt="Google logo"
//                 className="w-10 h-7 mr-2"
//               />
//               {isSignUp ? "Sign Up with Google" : "Login with Google"}
//             </button>
//           </div>
//           <p className="text-center text-gray-600 mt-4">
//             {isSignUp
//               ? "Already have an account?"
//               : "Don't have an account?"}{" "}
//             <button
//               onClick={toggleSignUp}
//               className="text-teal-500 hover:text-teal-700"
//             >
//               {isSignUp ? "Login" : "Sign Up"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
