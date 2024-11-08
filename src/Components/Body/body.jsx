import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/login";
import CarInfoCard from "../Vehiculos/vehiculos";
function Body() {
  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/vehiculos" element={<CarInfoCard />} />
        </Routes>
      </section>
    </>
  );
}

export default Body;
