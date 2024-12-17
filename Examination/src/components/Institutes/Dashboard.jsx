'use client'
import React, { useEffect, useRef } from 'react';
import "./Dashboard.css";
import { Chart, 
         LineController, 
         LineElement, 
         PointElement, 
         LinearScale, 
         Title, 
         CategoryScale, 
         BarController, 
         BarElement, 
         DoughnutController, 
         PieController, 
         ArcElement } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons'

// Register necessary Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, DoughnutController, PieController, ArcElement);

const Dashboard = () => {
  // Refs for managing chart instances
  const resultChartRef = useRef(null);
  const attendanceChartRef = useRef(null);
  const enrollmentChartRef = useRef(null);
  const feesChartRef = useRef(null);

  // Store chart instances
  const resultChart = useRef(null);
  const attendanceChart = useRef(null);
  const enrollmentChart = useRef(null);
  const feesChart = useRef(null);

  useEffect(() => {
    // Create and manage charts with animations
    const createChart = (ctx, type, data, options) => {
      return new Chart(ctx, {
        type,
        data,
        options: {
          ...options,
          animation: {
            duration: 1500, // Custom animation duration
            easing: 'easeInOutQuad'
          }
        }
      });
    };

    // Student Results Chart
    const resultCtx = resultChartRef.current.getContext('2d');
    resultChart.current = createChart(resultCtx, 'bar', {
      labels: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'],
      datasets: [{
        label: 'Marks',
        data: [70, 85, 60, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    }, {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    });

    // Attendance Chart
    const attendanceCtx = attendanceChartRef.current.getContext('2d');
    attendanceChart.current = createChart(attendanceCtx, 'line', {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Attendance',
        data: [95, 80, 85, 90, 100],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    }, {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    });

    // Student Enrollment Chart
    const enrollmentCtx = enrollmentChartRef.current.getContext('2d');
    enrollmentChart.current = createChart(enrollmentCtx, 'pie', {
      labels: ['Course 1', 'Course 2', 'Course 3'],
      datasets: [{
        label: 'Enrollment',
        data: [50, 40, 60],
        backgroundColor: ['rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }]
    }, {
      responsive: true
    });

    // Fees Payment Chart
    const feesCtx = feesChartRef.current.getContext('2d');
    feesChart.current = createChart(feesCtx, 'doughnut', {
      labels: ['Paid', 'Pending'],
      datasets: [{
        label: 'Fees',
        data: [75, 25],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 159, 64, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1
      }]
    }, {
      responsive: true
    });

    // Cleanup function to destroy charts on component unmount
    return () => {
      if (resultChart.current) resultChart.current.destroy();
      if (attendanceChart.current) attendanceChart.current.destroy();
      if (enrollmentChart.current) enrollmentChart.current.destroy();
      if (feesChart.current) feesChart.current.destroy();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="header">
          {/* <h1>Dashboard</h1> */}
          <div className="search-bar ">
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className="user-wrapper">
            <img 
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" 
              alt="user profile" 
              className="profile-img" 
            />
            <div >
              <h4 className='text-black'>John Doe</h4>
            </div>
            <div className="notification">
              <FontAwesomeIcon icon={faBell} className="notification-bell" role="img" aria-label="Notifications" />
              <span className="badge">3</span> {/* Notification badge */}
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="welcome-banner">
          <h2><big>👋 Welcome to Sambhav School of Technology</big></h2>
          
        </div>

        {/* Information section */}
        <div className="info-section">
          <div className="info-card text-black">
            <h3>150</h3>
            <p>Students</p>
          </div>
          <div className="info-card text-black">
            <h3>20</h3>
            <p>Faculty</p>
          </div>
          <div className="info-card text-black">
            <h3>30</h3>
            <p>Courses</p>
          </div>
          <div className="info-card text-black">
            <h3>10</h3>
            <p>Notes</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart-container">
            <h3>Student Results</h3>
            <canvas ref={resultChartRef} id="resultChart"></canvas>
          </div>
          <div className="chart-container">
            <h3>Attendance</h3>
            <canvas ref={attendanceChartRef} id="attendanceChart"></canvas>
          </div>
          <div className="chart-container">
            <h3>Student Enrollment</h3>
            <canvas ref={enrollmentChartRef} id="enrollmentChart"></canvas>
          </div>
          <div className="chart-container">
            <h3>Fees Payment</h3>
            <canvas ref={feesChartRef} id="feesChart"></canvas>
          </div>
        </div>
      </main>

      {/* Adjusted styling for alignment */}
      <style jsx>{`
        .dashboard-container {
          display: flex; /* Use flexbox to align sidebar and main content */
          background-color: #E8DEE3; /* Light background color */
          padding: 20px;
          height: 100vh; /* Full height */
        }
        .main-content {
          flex: 1; /* Main content takes remaining space */
          padding: 20px;
          overflow-y: auto; /* Allow scrolling if content is too long */
          margin-left: 300px; /* Shift main content to the right */
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .search-bar {
          display: flex;
          align-items: center;
        }
        .search-bar input {
          padding: 8px;
          border: 1px solid #ced4da;
          border-radius: 5px;
          margin-right: 10px;
        }
        .user-wrapper {
          display: flex;
          align-items: center;
        }
        .profile-img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .info-section {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
          padding: 10px;
          background-color: #e9ecef;
          border-radius: 10px;
        }
        .info-card {
          text-align: center;
          padding: 10px;
          background-color: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          flex: 1; /* Make cards take equal space */
          margin: 0 10px; /* Add some margin between cards */
        }
        .chart-container {
          margin: 20px 0;
          flex: 1; /* Allow chart containers to grow */
          min-width: 300px; /* Minimum width for responsiveness */
        }
        .welcome-banner {
          text-align: center;
          padding: 20px;
          background-color: #343a40;
          color: white;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .charts {
          display: flex;
          flex-wrap: wrap; /* Allow charts to wrap on smaller screens */
          gap: 20px; /* Add space between charts */
        }
        .notification {
          position: relative;
          display: inline-block;
        }
        .notification-bell {
          font-size: 2rem; /* Increase size of the bell */
        }
        .notification .badge {
          position: absolute;
          top: -10px;
          right: -10px;
          padding: 5px 10px;
          border-radius: 50%;
          background-color: red;
          color: white;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
