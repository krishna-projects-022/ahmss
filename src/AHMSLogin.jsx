import React, { useState } from "react";

export default function AHMSLogin({ registrations, setLoggedInUser, setCurrentView }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    // Check if login ID and password match any registration
    const user = registrations.find(
      (reg) => reg.id === loginId && reg.password === password
    );
    if (user) {
      setLoggedInUser(user);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid login ID or password. Please try again.");
    }
  }

  return (
    <div className="ahms-container">
      <h2>Login to AHMS</h2>
      <form onSubmit={handleLogin} className="ahms-form" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Enter Login ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="ahms-button">
          Login
        </button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>

      <button
        onClick={() => setCurrentView("register")}
        style={{ marginTop: "1rem" }}
      >
        Back to Registration
      </button>
    </div>
  );
}
