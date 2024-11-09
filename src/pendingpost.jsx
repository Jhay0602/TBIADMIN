import React, { useState } from 'react';

const PendingPost = () => {
  const [activeTab, setActiveTab] = useState('event');
  const [eventData, setEventData] = useState([]);
  const [startupData, setStartupData] = useState([]);

  // State for event and startup form inputs
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    host: ''
  });

  const [startupForm, setStartupForm] = useState({
    name: '',
    description: '',
    founder: '',
    location: '',
    stage: ''
  });

  // Handle input changes for event form
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle input changes for startup form
  const handleStartupChange = (e) => {
    const { name, value } = e.target;
    setStartupForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle event form submission
  const handleEventSubmit = (e) => {
    e.preventDefault();
    setEventData([...eventData, { ...eventForm, isPending: true }]); // Mark as pending
    setEventForm({
      title: '',
      description: '',
      date: '',
      location: '',
      category: '',
      host: ''
    });
  };

  // Handle startup form submission
  const handleStartupSubmit = (e) => {
    e.preventDefault();
    setStartupData([...startupData, { ...startupForm, isPending: true }]); // Mark as pending
    setStartupForm({
      name: '',
      description: '',
      founder: '',
      location: '',
      stage: ''
    });
  };

  // Handle delete event
  const handleDeleteEvent = (index) => {
    setEventData(eventData.filter((_, i) => i !== index));
  };

  // Handle delete startup
  const handleDeleteStartup = (index) => {
    setStartupData(startupData.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Pending Post - Add Event or Startup</h1>
      <p className="text-gray-600">Manage your pending events and startup posts before submitting them for approval.</p>

      <div className="flex space-x-4 border-b border-gray-300">
        <button
          className={`py-2 px-4 ${activeTab === 'event' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('event')}
        >
          Post Event
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'startup' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('startup')}
        >
          Add Startup
        </button>
      </div>

      {activeTab === 'event' ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Post an Event</h2>
          <form onSubmit={handleEventSubmit}>
            <input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={handleEventChange}
              placeholder="Event Title"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              value={eventForm.description}
              onChange={handleEventChange}
              placeholder="Event Description"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            ></textarea>
            <div className="flex space-x-4">
              <input
                type="datetime-local"
                name="date"
                value={eventForm.date}
                onChange={handleEventChange}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="location"
                value={eventForm.location}
                onChange={handleEventChange}
                placeholder="Event Location"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <select
              name="category"
              value={eventForm.category}
              onChange={handleEventChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option>Select Event Category</option>
              <option>Conference</option>
              <option>Workshop</option>
              <option>Meetup</option>
            </select>
            <div className="flex space-x-4">
              <input
                type="text"
                name="host"
                value={eventForm.host}
                onChange={handleEventChange}
                placeholder="Event Host"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
            >
              Save Event Draft
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add a Startup</h2>
          <form onSubmit={handleStartupSubmit}>
            <input
              type="text"
              name="name"
              value={startupForm.name}
              onChange={handleStartupChange}
              placeholder="Startup Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              value={startupForm.description}
              onChange={handleStartupChange}
              placeholder="Startup Description"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            ></textarea>
            <input
              type="text"
              name="founder"
              value={startupForm.founder}
              onChange={handleStartupChange}
              placeholder="Founder Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="location"
                value={startupForm.location}
                onChange={handleStartupChange}
                placeholder="Startup Location"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              />
              <select
                name="stage"
                value={startupForm.stage}
                onChange={handleStartupChange}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              >
                <option>Select Startup Stage</option>
                <option>Early-Stage</option>
                <option>Growth</option>
                <option>Established</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
            >
              Save Startup Draft
            </button>
          </form>
        </div>
      )}

      {/* Pending Posts List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Pending Posts</h2>
        <ul>
          {eventData.filter(event => event.isPending).map((event, index) => (
            <li key={index} className="border-b border-gray-200 py-2 flex justify-between">
              <div className="text-gray-600">{event.title} - Pending</div>
              <div className="space-x-2">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500" onClick={() => handleDeleteEvent(index)}>Delete</button>
              </div>
            </li>
          ))}
          {startupData.filter(startup => startup.isPending).map((startup, index) => (
            <li key={index} className="border-b border-gray-200 py-2 flex justify-between">
              <div className="text-gray-600">{startup.name} - Pending</div>
              <div className="space-x-2">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500" onClick={() => handleDeleteStartup(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PendingPost;
