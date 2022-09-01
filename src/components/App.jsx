import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import AddList from "./AddList";
import List from "./List";
import Success from "./Success";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/addList" element={<AddList />} />
      <Route path="/list" element={<List />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
