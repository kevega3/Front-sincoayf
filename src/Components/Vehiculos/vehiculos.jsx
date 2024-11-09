import React, { useContext, useEffect, useState } from "react";
import { VehiculoContext } from "../Context/vehiculosContext";
import Grid from "@mui/material/Grid";
import CartaVehiculo from "./carVehiculo";
import Pagination from "@mui/material/Pagination";
import { Box, Typography } from "@mui/material";
import ModalCrearVehiculo from "./modalVehiculo";
function Vehiculo() {
  const { Vehiculos } = useContext(VehiculoContext);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(Vehiculos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehiculos = Vehiculos.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Opcional: Scroll arriba al cambiar de página
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" align="start" gutterBottom>
        Vehículos
      </Typography>
      <div align={"end"}>
        <ModalCrearVehiculo />
      </div>
      <Grid container spacing={4}>
        {currentVehiculos.map((vehiculo) => (
          <Grid item xs={12} sm={6} md={3} key={vehiculo.VehiculoID}>
            <CartaVehiculo datos={vehiculo} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}

export default Vehiculo;
