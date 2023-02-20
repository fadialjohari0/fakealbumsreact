import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/login/login.component";
import Albums from "./Components/Albums/albums.component";
import Photos from "./Components/Photos/photos.component";
import UserContext from "./Context/UserContext";
import ProtectedRoutes from "./Components/protectedRoutes/protectedRoutes";
import "./App.scss";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route
            path="/albums"
            element={<ProtectedRoutes component={Albums} />}
          />
          <Route
            path="/albums/:albumid/photos"
            element={<ProtectedRoutes component={Photos} />}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
