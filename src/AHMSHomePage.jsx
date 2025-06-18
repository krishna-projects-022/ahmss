import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./AHMSHomePage.css";

export default function AHMSHomePage() {
  // State to toggle between registration and login views
  const [showLogin, setShowLogin] = useState(false);

  // Form state for registration
  const [formData, setFormData] = useState({
    district: "",
    fullName: "",
    mobile: "",
    email: "",
    company: "",
    esiNumber: "",
    aadhaar: "",
    age: "",
    gender: "",
    address: "",
  });

  // Form state for login
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  // Store registrations
  const [registrations, setRegistrations] = useState([]);

  // Selected registration for modal
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // For logged in user (simple)
  const [loggedInUser, setLoggedInUser] = useState(null);

  // State for editing user details
  const [editUser, setEditUser] = useState(null);

  // Load registrations from localStorage on mount
  useEffect(() => {
    const savedRegistrations = localStorage.getItem("registrations");
    if (savedRegistrations) {
      setRegistrations(JSON.parse(savedRegistrations));
    }
  }, []);

  // Save registrations to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
    // Uncomment to debug: console.log("Registrations saved:", registrations);
  }, [registrations]);

  // Handle registration input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login input changes with trimming
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Register form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create unique login credentials
    const loginId = formData.mobile || `user${Date.now()}`;
    const password = formData.aadhaar
      ? formData.aadhaar.slice(-6)
      : Math.random().toString(36).slice(-6);

    // Create unique ID for registration
    const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const registration = { id, loginId, password, ...formData };

    // Update registrations state
    setRegistrations((prev) => [...prev, registration]);

    // Show registration success message with credentials
    alert(
      `Registered Successfully!\n\nYour Login ID: ${loginId}\nPassword: ${password}`
    );

    // Reset form
    setFormData({
      district: "",
      fullName: "",
      mobile: "",
      email: "",
      company: "",
      esiNumber: "",
      aadhaar: "",
      age: "",
      gender: "",
      address: "",
    });

    // Switch to login form
    setShowLogin(true);
    // Uncomment to debug: console.log("Registrations after submit:", registrations);
  };

  // Login form submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Find user with matching loginId and password
    const user = registrations.find(
      (r) => r.loginId === loginData.loginId && r.password === loginData.password
    );

    if (user) {
      setLoggedInUser(user);
      alert(`Welcome, ${user.fullName}! You are logged in.`);
      setShowLogin(false);
      setLoginData({ loginId: "", password: "" });
    } else {
      alert("Invalid Login ID or Password. Please check your credentials.");
    }
    // Uncomment to debug: console.log("Login attempt - LoginData:", loginData, "Registrations:", registrations);
  };

  // Save edited user details
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (editUser) {
      setRegistrations((prev) =>
        prev.map((reg) => (reg.id === editUser.id ? editUser : reg))
      );
      setLoggedInUser(editUser);
      setEditUser(null);
      alert("Details updated successfully!");
    }
  };

  // Logout
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          width: "100%",
          padding: "15px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <style>
          {`
            @media (max-width: 768px) {
              header > div {
                flex-direction: column;
                align-items: center;
              }
              header > div > div:first-child {
                margin-bottom: 10px;
              }
              header > div > div:last-child {
                justify-content: center;
              }
              header img {
                margin: 5px;
              }
            }
            @media (max-width: 480px) {
              header {
                padding: 10px;
              }
              header > div > div:last-child {
                flex-direction: column;
                gap: 10px;
              }
              header img {
                height: 50px;
                width: 50px;
              }
              header p {
                fontSize: "0.7rem";
              }
            }
          `}
        </style>
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://images.seeklogo.com/logo-png/0/2/ap-govt-logo-png_seeklogo-9534.png"
              alt="AP Government Logo"
              style={{ height: 60, width: 60, objectFit: "cover" }}
            />
            <div>
              <p style={{ margin: 0, color: "#333", fontSize: "1rem" }}>
                Government of Andhra Pradesh
              </p>
              <p style={{ margin: 0, color: "#555", fontSize: "0.9rem" }}>
                AarogyaSethu – Andhra Pradesh Health Monitoring System (AHMS)
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://cdn.siasat.com/wp-content/uploads/2024/06/ap-cm.webp"
                alt="CM N. Chandrababu Naidu"
                style={{ height: 60, width: 60, borderRadius: "8px", objectFit: "cover" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://egov.eletsonline.com/wp-content/uploads/2024/10/Pawan-Kalyan.jpg"
                alt="Dy CM Pawan Kalyan"
                style={{ height: 60, width: 60, borderRadius: "8px", objectFit: "cover" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://kurnooltdp.com/wp-content/uploads/2023/02/Nara_Lokesh_at_Party_Office-e1677232618953.jpg"
                alt="Health Minister Satya Kumar Yadav"
                style={{ height: 60, width: 60, borderRadius: "8px", objectFit: "cover" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://media.assettype.com/newindianexpress%2F2025-04-09%2F2ugn99dh%2FNew-Project-2025-04-09T112437.022.jpg"
                alt="Labour Minister Vasamsetti Subhash"
                style={{ height: 60, width: 60, borderRadius: "8px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <section
          style={{
            margin: "10px 0",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textAlign: "center",
            color: "#dc3545",
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          "Empowering Health. Enabling Hope. Every Citizen, Every Day."
        </section>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: "1000px", margin: "0 auto", boxSizing: "border-box", padding: "0 20px" }}>
        {/* Show welcome message if logged in */}
        {loggedInUser && (
          <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "", borderRadius: "5px", width: "100%" }}>
            <h2>Welcome, {loggedInUser.fullName}!</h2>
            <button onClick={handleLogout} style={{ padding: "8px 12px", cursor: "pointer" }}>
              Logout
            </button>
            <button
              onClick={() => setEditUser({ ...loggedInUser })}
              style={{ padding: "8px 12px", cursor: "pointer", marginLeft: "10px" }}
            >
              Edit Details
            </button>
          </div>
        )}

        {/* Display User Details and Dummy Reports */}
        {loggedInUser && (
          <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "white", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <h3>User Details</h3>
            <p><strong>Login ID:</strong> {loggedInUser.loginId}</p>
            <p><strong>Full Name:</strong> {loggedInUser.fullName}</p>
            <p><strong>District:</strong> {loggedInUser.district}</p>
            <p><strong>Mobile:</strong> {loggedInUser.mobile}</p>
            <p><strong>Email:</strong> {loggedInUser.email}</p>
            <p><strong>Company:</strong> {loggedInUser.company}</p>
            <p><strong>ESI Number:</strong> {loggedInUser.esiNumber}</p>
            <p><strong>Aadhaar:</strong> {loggedInUser.aadhaar}</p>
            <p><strong>Age:</strong> {loggedInUser.age}</p>
            <p><strong>Gender:</strong> {loggedInUser.gender}</p>
            <p><strong>Address:</strong> {loggedInUser.address}</p>

            <h3>Dummy Health Reports</h3>
            <ul>
              <li>Blood Pressure: 120/80 mmHg (Normal)</li>
              <li>Blood Sugar: 90 mg/dL (Normal)</li>
              <li>Cholesterol: 180 mg/dL (Normal)</li>
              <li>Heart Rate: 72 bpm (Normal)</li>
            </ul>
          </div>
        )}

        {/* Edit User Details Form */}
        {editUser && (
          <div style={{ maxWidth: 500, margin: "20px auto", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "100%", boxSizing: "border-box" }}>
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Edit Your Details</h3>
            <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSaveChanges}>
              <select
                name="district"
                value={editUser.district}
                onChange={handleEditChange}
                required
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              >
                <option value="">Select Your District</option>
                <option>Anantapur</option>
                <option>Chittoor</option>
                <option>East Godavari</option>
                <option>Guntur</option>
                <option>Krishna</option>
                <option>Kurnool</option>
                <option>Prakasam</option>
                <option>Nellore</option>
                <option>Srikakulam</option>
                <option>Visakhapatnam</option>
                <option>Vizianagaram</option>
                <option>West Godavari</option>
                <option>YSR Kadapa</option>
              </select>
              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={editUser.fullName}
                onChange={handleEditChange}
                required
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  name="mobile"
                  type="text"
                  placeholder="10-digit mobile number"
                  value={editUser.mobile}
                  onChange={handleEditChange}
                  required
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={editUser.email}
                  onChange={handleEditChange}
                  required
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                />
              </div>
              <input
                name="company"
                type="text"
                placeholder="Enter your company name and designation"
                value={editUser.company}
                onChange={handleEditChange}
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  name="esiNumber"
                  type="text"
                  placeholder="ESI Registration Number"
                  value={editUser.esiNumber}
                  onChange={handleEditChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                />
                <input
                  name="aadhaar"
                  type="text"
                  placeholder="12-digit Aadhaar number"
                  value={editUser.aadhaar}
                  onChange={handleEditChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  name="age"
                  type="number"
                  placeholder="Your age"
                  value={editUser.age}
                  onChange={handleEditChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                />
                <select
                  name="gender"
                  value={editUser.gender}
                  onChange={handleEditChange}
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <input
                name="address"
                type="text"
                placeholder="Enter your complete address"
                value={editUser.address}
                onChange={handleEditChange}
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px",
                    background: "linear-gradient(to right, #ffd700, #ff4500)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    flex: "1",
                    minWidth: "150px",
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  style={{
                    padding: "10px",
                    background: "linear-gradient(to right, #ffd700, #ff4500)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    flex: "1",
                    minWidth: "150px",
                  }}
                  onClick={() => setEditUser(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {!loggedInUser && (
          <>
            {!showLogin ? (
              // Registration form
              <div
                style={{
                  maxWidth: 500,
                  margin: "20px auto",
                  padding: "20px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Health Test Registration</h3>
                <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
                  Register for free health tests provided by AP Government
                </p>
                <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleSubmit}>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
                  >
                    <option value="">Select Your District</option>
                    <option>Alluri Sitharama Raju</option>
                    <option>Anakapalli</option>
                    <option>Anantapur</option>
                    <option>Annamayya</option>
                    <option>Bapatla</option>
                    <option>Chittoor</option>
                    <option>Dr. B.R. Ambedkar Konaseema</option>
                    <option>East Godavari</option>
                    <option>Eluru</option>
                    <option>Guntur</option>
                    <option>Kakinada</option>
                    <option>Krishna</option>
                    <option>Kurnool</option>
                    <option>Nandyal</option>
                    <option>NTR</option>
                    <option>Palnadu</option>
                    <option>Parvathipuram Manyam</option>
                    <option>Prakasam</option>
                    <option>Sri Potti Sriramulu Nellore</option>
                    <option>Sri Sathya Sai</option>
                    <option>Srikakulam</option>
                    <option>Tirupati</option>
                    <option>Visakhapatnam</option>
                    <option>Vizianagaram</option>
                    <option>West Godavari</option>
                    <option>YSR Kadapa</option>
                  </select>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
                  />
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <input
                      name="mobile"
                      type="text"
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                    />
                  </div>
                  <input
                    name="company"
                    type="text"
                    placeholder="Enter your company name and designation"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
                  />
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <input
                      name="esiNumber"
                      type="text"
                      placeholder="ESI Registration Number"
                      value={formData.esiNumber}
                      onChange={handleChange}
                      required
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                    />
                    <input
                      name="aadhaar"
                      type="text"
                      placeholder="12-digit Aadhaar number"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      required
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <input
                      name="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <input
                    name="address"
                    type="text"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
                  />
                  <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px",
                        background: "linear-gradient(to right, #ffd700, #ff4500)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        flex: "1",
                        minWidth: "150px",
                      }}
                    >
                      REGISTER NOW
                    </button>
                    <button
                      type="button"
                      style={{
                        padding: "10px",
                        background: "linear-gradient(to right, #ffd700, #ff4500)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        flex: "1",
                        minWidth: "150px",
                      }}
                      onClick={() => setShowLogin(true)}
                    >
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Login form
              <div style={{ maxWidth: 400, margin: "20px auto", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "100%", boxSizing: "border-box" }}>
                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Login to Your Account</h3>
                <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} onSubmit={handleLoginSubmit}>
                  <input
                    name="loginId"
                    type="text"
                    placeholder="Enter Login ID"
                    value={loginData.loginId}
                    onChange={handleLoginChange}
                    required
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
                  />
                  <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
                    <button
                      type="submit"
                      style={{
                        padding: "10px",
                        background: "linear-gradient(to right, #ffd700, #ff4500)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        flex: "1",
                        minWidth: "150px",
                      }}
                    >
                      LOGIN
                    </button>
                    <button
                      type="button"
                      style={{
                        padding: "10px",
                        background: "linear-gradient(to right, #ffd700, #ff4500)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        flex: "1",
                        minWidth: "150px",
                      }}
                      onClick={() => setShowLogin(false)}
                    >
                      REGISTER
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* Show registrations list with QR codes only if logged in */}
        {loggedInUser && registrations.length > 0 && (
          <div style={{ marginTop: "40px", width: "100%", boxSizing: "border-box" }}>
            <h3>Registered Users</h3>
            {registrations.map((reg) => {
              const qrValue = JSON.stringify(reg);
              return (
                <div
                  key={reg.id}
                  style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "15px", flexWrap: "wrap", width: "100%" }}
                >
                  <p style={{ margin: 0, flex: "1", minWidth: "200px" }}>
                    {reg.fullName} ({reg.district})
                  </p>
                  <QRCodeCanvas
                    value={qrValue}
                    size={128}
                    onClick={() => setSelectedRegistration(reg)}
                    style={{ cursor: "pointer" }}
                    title="Click to view registration details"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for registration details */}
        {selectedRegistration && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setSelectedRegistration(null)}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                width: "90%",
                maxHeight: "80vh",
                overflowY: "auto",
                boxSizing: "border-box",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Registration Details</h3>
              <p>
                <strong>Name:</strong> {selectedRegistration.fullName}
              </p>
              <p>
                <strong>District:</strong> {selectedRegistration.district}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedRegistration.mobile}
              </p>
              <p>
                <strong>Email:</strong> {selectedRegistration.email}
              </p>
              <p>
                <strong>Company & Designation:</strong> {selectedRegistration.company}
              </p>
              <p>
                <strong>ESI Number:</strong> {selectedRegistration.esiNumber}
              </p>
              <p>
                <strong>Aadhaar Number:</strong> {selectedRegistration.aadhaar}
              </p>
              <p>
                <strong>Age:</strong> {selectedRegistration.age}
              </p>
              <p>
                <strong>Gender:</strong> {selectedRegistration.gender}
              </p>
              <p>
                <strong>Address:</strong> {selectedRegistration.address}
              </p>
              <button
                onClick={() => setSelectedRegistration(null)}
                style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}