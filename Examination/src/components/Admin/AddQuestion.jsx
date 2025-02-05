"use client"; // Required for client-side interactivity
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Admin/Sidebar"; // Adjust path based on your project structure

const AddQuestions = () => {
  const [formData, setFormData] = useState({
    topic_id: "",
    subject_id: "",
    question: "",
    programme: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/questions", formData);
      console.log("Question added successfully:", response.data);
      setFormData({
        topic_id: "",
        subject_id: "",
        question: "",
        programme: "",
        options: ["", "", "", ""],
        answer: "",
      });
      alert("Question added successfully!");
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">Add Questions</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md text-black"
        >
          {/* Topic ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Topic ID</label>
            <input
              type="number"
              name="topic_id"
              value={formData.topic_id}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Subject ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Subject ID</label>
            <input
              type="number"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Question */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              required
            />
          </div>

          {/* Programme */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Programme</label>
            <textarea
              name="programme"
              value={formData.programme}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              required
            />
          </div>

          {/* Options */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Answer */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Correct Answer</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;
