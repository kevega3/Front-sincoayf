import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/login";
function Body() {
  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </section>
    </>
  );
}

export default Body;
