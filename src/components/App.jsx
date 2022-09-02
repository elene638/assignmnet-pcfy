import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import AddList from "./AddList";
import List from "./List";
import Success from "./Success";
import LaptopList from "./LaptopList";
import EachLaptop from "./EachLaptop";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/addList" element={<AddList />} />
      <Route path="/list" element={<List />} />
      <Route path="/success" element={<Success />} />
      <Route path="/laptopList" element={<LaptopList />} />
      <Route path="/eachLaptop" element={<EachLaptop />} />
    </Routes>
  );
}

export default App;
