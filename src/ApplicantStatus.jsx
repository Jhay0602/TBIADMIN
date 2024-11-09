import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ApplicantStatus = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // Track the filter status (All, Accepted, Rejected)
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  useEffect(() => {
    // Simulating an API call to fetch applicant data
    const fetchApplicants = async () => {
      const mockData = [
        { id: 1, name: 'John Doe', industry: 'Technology', status: 'Accepted', date: '2024-11-01T14:30:00' },
        { id: 2, name: 'Jane Smith', industry: 'Healthcare', status: 'Accepted', date: '2024-11-02T09:00:00' },
        { id: 3, name: 'Sara Lee', industry: 'Design', status: 'Application Under Review', date: '2024-11-03T11:45:00' },
        { id: 4, name: 'David Brown', industry: 'Finance', status: 'Rejected', date: '2024-11-04T15:30:00' },
        { id: 5, name: 'Michael Johnson', industry: 'Marketing', status: 'Rejected', date: '2024-11-05T16:00:00' }
      ];

      setTimeout(() => {
        setApplicants(mockData);
      }, 1000);
    };

    fetchApplicants();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setConfirmDelete({ show: true, id });
  };

  const confirmDeleteApplicant = (confirm) => {
    if (confirm) {
      setApplicants(applicants.filter(applicant => applicant.id !== confirmDelete.id));
    }
    setConfirmDelete({ show: false, id: null });
  };

  const filteredApplicants = applicants.filter(applicant => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Accepted') return applicant.status === 'Accepted';
    if (filterStatus === 'Rejected') return applicant.status === 'Rejected';
    return applicant;
  }).filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Applicant Status</h1>

      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />

        <button
          onClick={() => setFilterStatus('All')}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('Accepted')}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Accepted
        </button>
        <button
          onClick={() => setFilterStatus('Rejected')}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Rejected
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Industry</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant) => {
            const date = new Date(applicant.date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <tr key={applicant.id}>
                <td className="border border-gray-300 p-2">
                  <Link
                    to={`/applicants/${applicant.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {applicant.name}
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">{applicant.industry}</td>
                <td className="border border-gray-300 p-2">{applicant.status}</td>
                <td className="border border-gray-300 p-2">{formattedDate}</td>
                <td className="border border-gray-300 p-2">{formattedTime}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(applicant.id)}
                    className="text-red-500 hover:underline"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {confirmDelete.show && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4">Are you sure you want to delete this applicant?</p>
            <button
              onClick={() => confirmDeleteApplicant(true)}
              className="mr-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => confirmDeleteApplicant(false)}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantStatus;
