"use client";
import React, { useState, useEffect } from "react";
import './Chatbot.css'; // Assuming you have relevant CSS styles in this file

const Chatbot = () => {
  const correctUsername = 'harsh12@'; // Predefined correct username
  const correctPassword = '123'; // Predefined correct password

  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hello from Sambhav School of Technology!" },
    { type: "bot", text: "Enter your username:" },
  ]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUsernameCorrect, setIsUsernameCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showExamOptions, setShowExamOptions] = useState(false);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isNoOptionSelected, setIsNoOptionSelected] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPostNoOptions, setShowPostNoOptions] = useState(false);
  const [reason, setReason] = useState(''); // New state for the reason

  // Fetch questions from the JSON file when exam starts
  useEffect(() => {
    if (isExamStarted) {
      fetch("/questions.json")
        .then(response => response.json())
        .then(data => setExamQuestions(data))
        .catch(error => console.error("Error fetching questions:", error));
    }
  }, [isExamStarted]);

  // Handle username submission
  const handleUsernameSubmit = () => {
    if (username === correctUsername) {
      setIsUsernameCorrect(true);
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "user", text: `Username: ${username}` },
        { type: "bot", text: "Username is correct. Now, please enter your password:" }
      ]);
    } else {
      setErrorMessage("Enter the right username");
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "user", text: `Username: ${username}` },
        { type: "bot", text: "Incorrect username. Please try again." }
      ]);
    }
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "user", text: "Password: ******" },
        { type: "bot", text: `Hey👋 ${username}, are you ready for the examination?` }
      ]);
      setShowExamOptions(true);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsDisabled(true);
        setErrorMessage("Too many failed attempts. Please try again later.");
        setMessages(prevMessages => [
          ...prevMessages,
          { type: "bot", text: "Too many failed attempts. Please try again later." }
        ]);
      } else {
        setErrorMessage("Incorrect password. Please try again.");
        setMessages(prevMessages => [
          ...prevMessages,
          { type: "user", text: "Password: ******" },
          { type: "bot", text: "Incorrect password. Please try again." }
        ]);
      }
    }
  };

  // Handle exam readiness
  const handleExamReadiness = (isReady) => {
    if (isReady) {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "bot", text: "It is an exam based on Python." },
        { type: "bot", text: "• Exam has Total 30 Questions" },
        { type: "bot", text: "• Total Time for Exam is 15 Minutes" },
        { type: "bot", text: "• Negative Marking: No" },
        { type: "bot", text: "Best of luck for your exam!" }
      ]);
      setIsExamStarted(true);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "bot", text: "No problem! Take your time and let me know when you are ready." }
      ]);
      setShowPostNoOptions(true); // Show the options after clicking "No"
      setIsNoOptionSelected(true);
    }
  };

  // Start the exam by showing the first question
  const startExam = () => {
    if (examQuestions.length > 0) {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "bot", text: `Here is your first question: ${examQuestions[currentQuestionIndex].question}` }
      ]);
    }
  };

  // Handle option selection for the current question
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle moving to the next question
  const handleSendMessage = () => {
    if (selectedOption !== null) {
      const currentQuestion = examQuestions[currentQuestionIndex];

      // Add both the question and the user's answer to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: currentQuestion.question }, // Display the question
        { type: "user", text: `Selected option: ${selectedOption}` }, // Display the answer
      ]);

      // Move to the next question
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < examQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: examQuestions[nextIndex].question }, // Display next question
          examQuestions[nextIndex].programme && {
            type: "bot",
            text: `Code example: ${examQuestions[nextIndex].programme}`, // Display programme if any
          },
        ]);
        setSelectedOption(null); // Reset selected option
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "Thank you for answering all the questions!" },
        ]);
        setCurrentQuestionIndex(null); // End of questions
      }
    }
  };

  // Handle option selection for actions after clicking "No"
  const handleNoOptionSelection = (option) => {
    setReason(''); // Reset reason for new selection
    let responseMessage = '';

    switch (option) {
      case "cancel":
        responseMessage = "The session has been canceled. Please provide a reason:";
        break;
      case "reschedule":
        responseMessage = "Your exam has been rescheduled. Please provide a reason:";
        break;
      case "home":
        responseMessage = "You can return to the home page or ask me a question! Please provide a reason:";
        break;
      case "start_exam":
        responseMessage = "Starting the exam...";
        startExam(); // Start the exam
        break;
      default:
        break;
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { type: "bot", text: responseMessage }
    ]);
  };

  // Handle reason submission
  const handleReasonSubmit = () => {
    if (reason.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "user", text: `Reason: ${reason}` },
        { type: "bot", text: "Thank you for your feedback!" }
      ]);
      setReason(''); // Reset the reason input
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: "bot", text: "Please provide a valid reason." }
      ]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-container">
        <div className="chat-header">Examinationbot</div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-container ${message.type === "user" ? 'user-message' : 'bot-message'}`}
            >
              {message.type === "bot" && (
                <img
                  src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725494400&semt=ais_hybrid"
                  alt="Avatar"
                  className="avatar"
                />
              )}
              <div className="message">
                <p>{message.text}</p>
              </div>
            </div>
          ))}

          {/* Username Input */}
          {!isUsernameCorrect && (
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                disabled={isDisabled}
              />
              <button className="send-btn" onClick={handleUsernameSubmit} disabled={isDisabled}>
                Submit Username
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          )}

          {/* Password Input */}
          {isUsernameCorrect && !isAuthenticated && (
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                disabled={isDisabled}
              />
              <button className="send-btn" onClick={handlePasswordSubmit} disabled={isDisabled}>
                Submit Password
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          )}

          {/* Exam Readiness Options */}
          {showExamOptions && !isExamStarted && !isNoOptionSelected && (
            <div className="exam-options">
              <p onClick={() => handleExamReadiness(true)} className="option-link">Yes</p>
              <p onClick={() => handleExamReadiness(false)} className="option-link">No</p>
            </div>
          )}

          {/* Post-No Options */}
          {isNoOptionSelected && showPostNoOptions && (
            <div className="post-no-options">
              <p onClick={() => handleNoOptionSelection("cancel")} className="option-link">Cancel Session</p>
              <p onClick={() => handleNoOptionSelection("reschedule")} className="option-link">Reschedule Exam</p>
              <p onClick={() => handleNoOptionSelection("home")} className="option-link">Go to Home</p>
              <p onClick={() => handleNoOptionSelection("start_exam")} className="option-link">Start Exam</p>
            </div>
          )}

          {/* Reason Input for Selected Option */}
          {isNoOptionSelected && (
            <div className="reason-input-container">
              <input
                type="text"
                placeholder="Type your reason here..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input-field"
              />
              <button className="send-btn" onClick={handleReasonSubmit}>
                Submit Reason
              </button>
            </div>
          )}

          {/* Start Exam Button */}
          {isExamStarted && !isNoOptionSelected && (
            <div className="exam-start-container">
              <button className="start-btn" onClick={startExam}>
                Start Exam
              </button>
            </div>
          )}

          {/* Exam Question Options */}
          {isExamStarted && examQuestions.length > 0 && (
            <div className="question-container">
              <h3>{examQuestions[currentQuestionIndex].question}</h3>
              {examQuestions[currentQuestionIndex].options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
              <button className="send-btn" onClick={handleSendMessage}>
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
