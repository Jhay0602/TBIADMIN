import React, { useState } from "react";

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [host, setHost] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowForm(true); // Open the form when a date is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new event object
    const newEvent = {
      eventName,
      category,
      location,
      host,
      time,
      date: selectedDate,
    };
    console.log("New Event: ", newEvent);
    // Close the form after submitting
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setEventName("");
    setCategory("");
    setLocation("");
    setHost("");
    setTime("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Calendar</h2>

      {/* Calendar Component */}
      <Calendar onChange={handleDateChange} value={selectedDate} />

      {/* Add Event Form */}
      {showForm && (
        <div className="mt-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h3 className="text-xl font-bold mb-4">Add Event for {selectedDate.toLocaleDateString()}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Host</label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Event;
