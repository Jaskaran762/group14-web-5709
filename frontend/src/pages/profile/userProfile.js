import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userProfile.css";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    dateOfBirth: "",
    income: "",
  });
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    dateOfBirth: "",
    income: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:3000/user/${userId}`, config)
      .then((response) => {
        setUser(response.data.user);
        setEditedUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedUser(user); 
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    const contactNoRegex = /^\d{10}$/;

    if (!nameRegex.test(editedUser.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (!nameRegex.test(editedUser.lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    if (!emailRegex.test(editedUser.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!contactNoRegex.test(editedUser.contactNo)) {
      newErrors.contactNo = "Number should contain 10 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .put(`http://localhost:3000/user/update/${userId}`, editedUser, config)
        .then((response) => {
          console.log("Profile updated:", response);
          setUser(editedUser);
          setIsEditMode(false);
        })
        .catch((error) => {
          console.error("Error updating profile:", error.response);
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div className="profile_comp">
      <div className="profile_container">
        <form className="profile_form" onSubmit={handleSubmit}>
          <div className="profile_tag">
            <h2>Profile</h2>
            {!isEditMode && (
              <div>
                <button className="btn" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="details">
            <div>
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={editedUser.firstName}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
              <p style={{ color: "red" }}>{errors.firstName}</p>
            </div>
            <div>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={editedUser.lastName}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
              <p style={{ color: "red" }}>{errors.lastName}</p>
            </div>
            <div>
              <label>Contact no.</label>
              <input
                type="text"
                name="contactNo"
                value={editedUser.contactNo}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
              <p style={{ color: "red" }}>{errors.contactNo}</p>
            </div>
            <div>
              <label>Date of birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formatDate(editedUser.dateOfBirth)}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
              <p style={{ color: "red" }}>{errors.email}</p>
            </div>
            <hr />
            <div>
              <h2>Income details</h2>
            </div>
            <div>
              <label>Income</label>
              <input
                type="text"
                name="income"
                value={editedUser.income}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
            </div>
            {isEditMode && (
              <div className="form-buttons">
                <button className="btn" type="submit">
                  Submit
                </button>
                <button className="btn" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
        <div className="profile_info">
          <div className="profile">
            <img className="profile_img" alt="Profile Image" />
          </div>

          <div className="userContactInfo">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.email}</p>
            <p>{user.contactNo}</p>
            <p>{user.dateOfBirth}</p>
          </div>

          <hr />

          <div className="userContactInfo">
            <h2>Income</h2>
            <p>{user.income}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
