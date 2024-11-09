import React, { useState } from 'react';

const Startups = () => {
  const [category, setCategory] = useState('incubatees'); // Default: Incubatees
  const [cohort, setCohort] = useState('cohortI'); // Default: Cohort I
  const [industry, setIndustry] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [photo, setPhoto] = useState(null); // State for uploaded photo
  const [addedStartups, setAddedStartups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null); // State to show clicked startup details
  const [editingStartup, setEditingStartup] = useState(null); // Startup being edited
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Show confirmation for deletion
  const [startupToDelete, setStartupToDelete] = useState(null); // Startup to delete

  // Handlers for form changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCohort('cohortI'); // Reset cohort to Cohort I when category changes
  };
  const handleCohortChange = (e) => setCohort(e.target.value);
  const handleIndustryChange = (e) => setIndustry(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserEmailChange = (e) => setUserEmail(e.target.value);

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddStartup = () => setShowForm(true);

  const handleSubmit = () => {
    if (!name || !address || !description || !userName || !userEmail || !photo) {
      alert('Please fill out all fields before submitting.');
      return;
    }
  
    const newStartup = {
      name,
      address,
      description,
      cohort,
      category,
      userName,
      userEmail,
      photo // include photo in the startup object
    };
  
    if (editingStartup) {
      // Edit existing startup
      const updatedStartups = addedStartups.map((startup) =>
        startup === editingStartup ? newStartup : startup
      );
      setAddedStartups(updatedStartups);
    } else {
      // Add new startup
      setAddedStartups([...addedStartups, newStartup]);
    }
  
    // Clear the form after successful submission
    setName('');
    setAddress('');
    setDescription('');
    setUserName('');
    setUserEmail('');
    setPhoto(null);
    setCohort('cohortI'); // Reset to Cohort I
    setCategory('incubatees'); // Reset to Incubatees
    setEditingStartup(null); // Reset editing state
  
    alert('Startup added/updated successfully');
    setShowForm(false); // Close the form after submission
  };
  
  const handleBackButton = () => {
    setShowForm(false); // Hide the form when back button is clicked
    setEditingStartup(null); // Reset editing state
  };

  const handleShowDetails = (startup) => {
    setShowDetails(startup);
  };

  const handleCloseDetails = () => {
    setShowDetails(null); // Close details modal
  };

  const handleEditStartup = (startup) => {
    setEditingStartup(startup);
    setName(startup.name);
    setAddress(startup.address);
    setDescription(startup.description);
    setUserName(startup.userName);
    setUserEmail(startup.userEmail);
    setPhoto(startup.photo);
    setCohort(startup.cohort);
    setCategory(startup.category);
    setShowForm(true);
  };

  const handleDeleteStartup = (startup) => {
    setStartupToDelete(startup);
    setShowConfirmDelete(true); // Show the confirmation modal
  };

  const handleConfirmDelete = (confirm) => {
    if (confirm) {
      setAddedStartups(addedStartups.filter((startup) => startup !== startupToDelete));
    }
    setShowConfirmDelete(false); // Close the confirmation modal
    setStartupToDelete(null); // Clear the startup to delete
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <h1 className="text-3xl font-semibold mb-6">Startups</h1>

      {/* Horizontal Categories with Dropdown */}
      <div className="flex justify-between items-end mb-6 z-10 relative">
        <div>
          <label className="block text-lg font-semibold mb-2">Category</label>
          <select
            className="w-32 p-3 border rounded-lg"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="incubatees">Incubatees</option>
            <option value="investors">Investors</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Cohort</label>
          <div className="flex gap-2">
            {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map((item, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${cohort === `cohort${item}` ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setCohort(`cohort${item}`)}
              >
                Cohort {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400"
            onClick={handleAddStartup}
          >
            Add Startup
          </button>
        </div>
      </div>

      {/* Form for Adding or Editing a Startup */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg z-20 absolute top-0 w-full max-w-md mx-auto mt-20" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-2xl font-semibold mb-4 text-center">{editingStartup ? 'Edit Startup' : 'Add Startup'}</h2>

          <div className="flex justify-end mb-4">
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-200"
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Category</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="incubatees">Incubatees</option>
              <option value="investors">Investors</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Cohort</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={cohort}
              onChange={handleCohortChange}
            >
              <option value="cohortI">Cohort I</option>
              <option value="cohortII">Cohort II</option>
              <option value="cohortIII">Cohort III</option>
              <option value="cohortIV">Cohort IV</option>
              <option value="cohortV">Cohort V</option>
              <option value="cohortVI">Cohort VI</option>
              <option value="cohortVII">Cohort VII</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Address</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={address}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">User Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">User Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              value={userEmail}
              onChange={handleUserEmailChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400"
              onClick={handleSubmit}
            >
              {editingStartup ? 'Update Startup' : 'Add Startup'}
            </button>
          </div>
        </div>
      )}

      {/* Added Startups Display */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Added Startups</h2>

        {/* Display startups only for the selected category and cohort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {addedStartups
            .filter((startup) => startup.category === category && startup.cohort === cohort) // Filter by category and cohort
            .map((startup, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg cursor-pointer relative"
                onClick={() => handleShowDetails(startup)}
              >
                {startup.photo && (
                  <img
                    src={startup.photo}
                    alt={startup.name}
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold">{startup.name}</h3>
                <p>{startup.address}</p>
                <p>Cohort: {startup.cohort}</p>

                {/* Edit and Delete Icons */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="text-yellow-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStartup(startup);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStartup(startup);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Confirmation Modal for Deletion */}
      {showConfirmDelete && (
        <div className="bg-gray-700 bg-opacity-50 absolute inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this startup?</h3>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                onClick={() => handleConfirmDelete(true)}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => handleConfirmDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show Startup Details */}
      {showDetails && (
        <div className="bg-white p-6 rounded-lg shadow-lg fixed inset-0 z-30 flex justify-center items-center">
          <div className="max-w-2xl w-full">
            <button className="absolute top-2 right-2 p-2 bg-gray-300 rounded-full" onClick={handleCloseDetails}>
              X
            </button>
            <h3 className="text-2xl font-semibold mb-4">{showDetails.name}</h3>
            <img
              src={showDetails.photo}
              alt={showDetails.name}
              className="w-48 h-48 object-cover rounded-full mb-4 mx-auto"
            />
            <p><strong>Address:</strong> {showDetails.address}</p>
            <p><strong>Description:</strong> {showDetails.description}</p>
            <p><strong>Cohort:</strong> {showDetails.cohort}</p>
            <p><strong>User:</strong> {showDetails.userName} ({showDetails.userEmail})</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Startups;
