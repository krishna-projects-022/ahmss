import React, { useState } from "react";
import AHMSHomePage from "./AHMSHomePage"; // your registration component
import AHMSLogin from "./AHMSLogin"; // login component

export default function AarogyaSethu_AP() {
  const [registrations, setRegistrations] = useState([]);
  const [currentView, setCurrentView] = useState("register"); // "register" or "login"
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>

      <main style={{ padding: "1rem" }}>
        {!loggedInUser && currentView === "register" && (
          <AHMSHomePage
            registrations={registrations}
            setRegistrations={setRegistrations}
            setCurrentView={setCurrentView}
          />
        )}

        {!loggedInUser && currentView === "login" && (
          <AHMSLogin
            registrations={registrations}
            setLoggedInUser={setLoggedInUser}
            setCurrentView={setCurrentView}
          />
        )}

        {loggedInUser && (
          <section>
            <h2>User Details</h2>
            <pre>{JSON.stringify(loggedInUser, null, 2)}</pre>
            <button
              onClick={() => {
                setLoggedInUser(null);
                setCurrentView("login");
              }}
            >
              Log Out
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
