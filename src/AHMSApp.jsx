import React, { useState } from "react";
import AHMSHomePage from "./AHMSHomePage";
import AHMSLogin from "./AHMSLogin";

export default function AHMSApp() {
  const [registrations, setRegistrations] = useState([]);
  const [currentView, setCurrentView] = useState("register"); // or "login"
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>


      {currentView === "register" && (
        <AHMSHomePage
          registrations={registrations}
          setRegistrations={setRegistrations}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === "login" && (
        <AHMSLogin
          registrations={registrations}
          setLoggedInUser={setLoggedInUser}
          setCurrentView={setCurrentView}
        />
      )}
      {loggedInUser && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Logged in User Details</h2>
          <pre>{JSON.stringify(loggedInUser, null, 2)}</pre>
          <button
            onClick={() => {
              setLoggedInUser(null);
              setCurrentView("login");
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
