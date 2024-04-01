import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import CustomPopUp from './CustomPopUp'; // Import CustomPopUp component
import '../css/AddObjective.css'; // Import CSS file

const AddObjective = () => {
  const [title, setTitle] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [timeframeError, setTimeframeError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send POST request to backend to create objective
        await axios.post('http://localhost:6000/okr/objectives', { title, timeframe });
        setShowPopUp(true);
      } catch (error) {
        setSubmitError('Failed to add objective. Please try again.');
        console.error('Error adding objective:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!title) {
      setTitleError('Title is required.');
      isValid = false;
    } else if (title.length > 100) {
      setTitleError('Title must be less than 100 characters.');
      isValid = false;
    } else {
      setTitleError('');
    }
    if (!timeframe) {
      setTimeframeError('Timeframe is required.');
      isValid = false;
    } else {
      setTimeframeError('');
    }
    return isValid;
  };

  const handleConfirm = () => {
    setShowPopUp(false);
    setTitle('');
    setTimeframe('');
  };

  const handleCancel = () => {
    setShowPopUp(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">FINtastic</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/add-objective" className="navbar-link">Add Objective</Link>
          </li>
        </ul>
      </nav>

      <div className="add-objective-container">
        <h2>Add New Objective</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {titleError && <span className="error">{titleError}</span>}
          <label>Timeframe:</label>
          <input type="date" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />
          {timeframeError && <span className="error">{timeframeError}</span>}
          <button type="submit">Submit</button>
        </form>
        {submitError && <span className="error">{submitError}</span>}
        <Link to="/">Go back to Objectives</Link>
        
        {showPopUp && (
          <CustomPopUp
            message="Are you sure you want to submit this objective?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default AddObjective;
