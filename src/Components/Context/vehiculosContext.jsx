// src/Components/Context/vehiculosContext.jsx
import React, { useEffect, createContext, useState } from "react";
import { Getvehiculo } from "../Services/vehiculoServices";

export const VehiculoContext = createContext();

export const VehiculoProvider = (props) => {
  const [Vehiculos, setVehiculos] = useState([]);
  const handlerVehiculos = async () => {
    try {
      const { data: vehiculos } = await Getvehiculo();
      console.log(vehiculos.data);
      setVehiculos(vehiculos.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  useEffect(() => {
    handlerVehiculos();
  }, []);

  return (
    <VehiculoContext.Provider
      value={{
        Vehiculos,
        handlerVehiculos, // Asegúrate de que el nombre coincida
      }}
    >
      {props.children}
    </VehiculoContext.Provider>
  );
};
