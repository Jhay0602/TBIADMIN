import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Startups from './startups'; // Import the Startups component
import ApplicantStatus from './applicantstatus';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PendingPost from './pendingpost';
import Event from './event';

const Dashboard = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-poppins">
        {/* AppBar */}
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <i className="fas fa-chart-line mr-2"></i> TBI Admin Dashboard
          </h1>
          <div className="flex space-x-4">
            <button className="text-lg hover:text-blue-400 flex items-center">
              <i className="fas fa-bell mr-1"></i> 
            </button>
            <button className="text-lg hover:text-blue-400 flex items-center">
              <i className="fas fa-envelope mr-1"></i> 
            </button>
            <button className="text-lg hover:text-blue-400 flex items-center">
              <i className="fas fa-user mr-1"></i> 
            </button>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-1/5 bg-white-900 text-black p-5 shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold mb-5 flex items-center">
              <i className="fas fa-home mr-2"></i> Dashboard
            </h2>
            <ul>
              {/* Add Dashboard link */}
              <li className="mb-3 flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i>
                {/* Link to Dashboard route */}
                <Link to="/" className="text-lg hover:text-blue-400">Dashboard</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-rocket mr-2"></i>
                <Link to="/startups" className="text-lg hover:text-blue-400">Startups</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-user-check mr-2"></i>
                <Link to="/applicantstatus" className="text-lg hover:text-blue-400">Applicant Status</Link>

              </li> 
              <li className="mb-3 flex items-center">
                <i className="fas fa-user-check mr-2"></i>
                <Link to="/pendingpost" className="text-lg hover:text-blue-400">Pending Post</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                <Link to="/event" className="text-lg hover:text-blue-400">Event</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-cog mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">Settings</a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-question-circle mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">Help and Support</a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">About</a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-sign-out-alt mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">Log out</a>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <Routes>
              {/* Define Route for Startups */}
              <Route path="/startups" element={<Startups />} />
              <Route path="/applicantstatus" element={<ApplicantStatus />} />
              <Route path="/event" element={<Event />} />
              <Route path="/pendingpost" element={<PendingPost />} />

              {/* Default Route for Dashboard */}
              <Route 
                path="/" 
                element={
                  <>
                    <h1 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Sample Cards */}
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Total Sales</h3>
                        <p className="text-2xl mt-2">$7,560</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">New Users</h3>
                        <p className="text-2xl mt-2">1,200</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Monthly Visits</h3>
                        <p className="text-2xl mt-2">89,000</p>
                      </div>
                    </div>
                  </>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
