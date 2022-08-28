import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import AddList from "./AddList";
import List from "./List";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/addList" element={<AddList />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export default App;
