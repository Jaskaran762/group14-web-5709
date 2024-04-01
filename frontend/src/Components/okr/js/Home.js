import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faPlus, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [objectives, setObjectives] = useState([]);
  const [expandedObjectives, setExpandedObjectives] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchObjectives();
  }, []); // Fetch objectives on component mount

  const fetchObjectives = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/okr/objectives'
      /*, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }*/
      );
      setObjectives(response.data);
    } catch (error) {
      console.error('Error fetching objectives', error);
    }
  };

  const toggleObjective = (id) => {
    setExpandedObjectives((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((item) => item !== id)
        : [...prevExpanded, id]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredObjectives = objectives.filter((objective) =>
    objective.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">FINtiastic</div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/add-objective" className="navbar-link">Add Objective</Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="home-container">
        <h2>Objectives and Key Results</h2>
        <div className="search-bar">
        <div className="button-container">
          <Link to="/add-objective">Add New Objective</Link>
        </div>
          <input
            type="text"
            placeholder="Search objectives..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        
        <div className="objectives-list">
          {filteredObjectives.map((objective) => (
            <div key={objective.id} className="objective-card">
              <div className="objective-header" onClick={() => toggleObjective(objective.id)}>
                <FontAwesomeIcon icon={faBullseye} className="goal-icon" />
                <h3 className="objective-title">{objective.title}</h3>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${objective.progress * 100}%` }}></div>
                </div>
                <div className="expandable-icon">
                  {expandedObjectives.includes(objective.id) ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </div>
              </div>
              <ul className={`key-results-list ${expandedObjectives.includes(objective.id) ? 'expanded' : ''}`}>
                {objective.keyResults.map((keyResult) => (
                  <li key={keyResult.id} className="key-result-item">
                    <FontAwesomeIcon icon={faBullseye} className="goal-icon" />
                    <span className="key-result-title">{keyResult.title}</span>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${keyResult.progress * 100}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
