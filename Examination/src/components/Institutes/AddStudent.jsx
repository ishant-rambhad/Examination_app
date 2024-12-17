"use client";
import { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    mobileNumber: "",
    identityProofType: "driving_license",
    identityProofNumber: "",
    course: "",
    studentImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      studentImage: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Prepare the form data for sending
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("email", formData.email);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("identityProofType", formData.identityProofType);
    data.append("identityProofNumber", formData.identityProofNumber);
    data.append("course", formData.course);
    data.append("studentImage", formData.studentImage);

    try {
      // Send form data to the API
      const response = await axios.post("/api/Institutes/addStudent", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          fullName: "",
          dateOfBirth: "",
          email: "",
          mobileNumber: "",
          identityProofType: "driving_license",
          identityProofNumber: "",
          course: "",
          studentImage: null,
        });
      }
    } catch (error) {
      console.error("Error adding student:", error);
      setError("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300 p-4 perspective-1000">
      <div className="flex flex-col w-full max-w-lg shadow-2xl rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
        <div className="w-full bg-white bg-opacity-80 p-10 flex flex-col justify-center rounded-xl shadow-2xl backdrop-blur-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-purple-700 text-2xl mb-6 font-bold text-center">Add New Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-purple-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-purple-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-700">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-purple-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="123-456-7890"
                  required
                />
              </div>

              {/* Identity Proof Type */}
              <div>
                <label htmlFor="identityProofType" className="block mb-2 text-sm font-medium text-purple-700">
                  Identity Proof Type
                </label>
                <select
                  id="identityProofType"
                  name="identityProofType"
                  value={formData.identityProofType}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                >
                  <option value="driving_license">Driving License</option>
                  <option value="aadhar_card">Aadhar Card</option>
                  <option value="pan_card">PAN Card</option>
                </select>
              </div>

              {/* Identity Proof Number */}
              <div>
                <label htmlFor="identityProofNumber" className="block mb-2 text-sm font-medium text-purple-700">
                  Identity Proof Number
                </label>
                <input
                  type="text"
                  id="identityProofNumber"
                  name="identityProofNumber"
                  value={formData.identityProofNumber}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="Enter ID number"
                  required
                />
              </div>

              {/* Course */}
              <div>
                <label htmlFor="course" className="block mb-2 text-sm font-medium text-purple-700">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  placeholder="Enter course"
                  required
                />
              </div>

              {/* Student Image */}
              <div>
                <label htmlFor="studentImage" className="block mb-2 text-sm font-medium text-purple-700">
                  Student Image
                </label>
                <input
                  type="file"
                  id="studentImage"
                  name="studentImage"
                  onChange={handleFileChange}
                  className="bg-white bg-opacity-90 border border-purple-300 text-purple-900 text-sm rounded-lg block w-full p-2.5 shadow-md hover:shadow-xl focus:ring-2 focus:ring-purple-400 transition duration-200 transform hover:scale-105"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">Student added successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
