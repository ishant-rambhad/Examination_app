"use client";
import React, { useState } from "react";

const AddEmployee = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    name: "",
    dob: "",
    address: "",
    aadhaar: "",
    mobile: "",
    technology: "",
    resume: null,
    image: null,
  });
  const [resumeMessage, setResumeMessage] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  // Handle resume upload
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setEmployee({ ...employee, resume: file });
      setResumeMessage("");
    } else {
      setResumeMessage("Please upload a PDF file.");
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setEmployee({ ...employee, image: file });
      setImageMessage("");
    } else {
      setImageMessage("Please upload a JPG image.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.resume || !employee.image) {
      setErrorMessage("Please upload both resume and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("dob", employee.dob);
    formData.append("address", employee.address);
    formData.append("aadhaar", employee.aadhaar);
    formData.append("mobile", employee.mobile);
    formData.append("technology", employee.technology);
    formData.append("resume", employee.resume);
    formData.append("image", employee.image);

    try {
      const response = await fetch("/api/Institutes/addEmployee", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const result = await response.json();
      setSuccessMessage(result.message);

      // Reset form fields
      setEmployee({
        name: "",
        dob: "",
        address: "",
        aadhaar: "",
        mobile: "",
        technology: "",
        resume: null,
        image: null,
      });
      setResumeMessage("");
      setImageMessage("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("There was an error adding the employee. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-300 to-green-300 p-4 perspective-1000">
      <div className="flex flex-col w-full max-w-lg shadow-2xl rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
        <div className="bg-white bg-opacity-80 p-10 flex flex-col justify-center rounded-xl shadow-2xl backdrop-blur-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-purple-700 text-2xl mb-6 font-bold text-center">Add New Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="Employee Name"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-purple-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={employee.dob}
                  onChange={handleChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-purple-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="Employee Address"
                  required
                />
              </div>

              {/* Aadhaar */}
              <div>
                <label htmlFor="aadhaar" className="block mb-2 text-sm font-medium text-purple-700">
                  Aadhaar Card No
                </label>
                <input
                  type="text"
                  id="aadhaar"
                  name="aadhaar"
                  value={employee.aadhaar}
                  onChange={handleChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="Enter Aadhaar No"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-purple-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={employee.mobile}
                  onChange={handleChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="123-456-7890"
                  required
                />
              </div>

              {/* Technology */}
              <div>
                <label htmlFor="technology" className="block mb-2 text-sm font-medium text-purple-700">
                  Technology
                </label>
                <select
                  id="technology"
                  name="technology"
                  value={employee.technology}
                  onChange={handleChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  required
                >
                  <option value="">Select Technology</option>
                  <option value="Python">Python</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume-upload" className="block mb-2 text-sm font-medium text-purple-700">
                  Upload Resume (PDF)
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  onChange={handleResumeChange}
                  accept=".pdf"
                  required
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {resumeMessage && <p className="text-sm text-purple-700">{resumeMessage}</p>}
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-purple-700">
                  Upload Image (JPG)
                </label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg"
                  required
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {imageMessage && <p className="text-sm text-purple-700">{imageMessage}</p>}
              </div>
            </div>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-purple-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-900 hover:shadow-lg transition-transform duration-200 transform hover:scale-105"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
