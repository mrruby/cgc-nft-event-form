import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Verify from "./screens/Verify";
import Form from "./screens/Form";
import Error from "./screens/Error";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/error" replace />} />
        <Route path="verify" element={<Verify />} />
        <Route path="form" element={<Form />} />
        <Route path="error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
