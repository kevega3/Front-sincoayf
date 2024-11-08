// import React from "react";

// function Gestion() {
//   return <div>Gestionar</div>;
// }

// export default Gestion;

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Grid,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  LocalGasStation,
  Speed,
  AttachMoney,
  CalendarToday,
} from "@mui/icons-material";

// Creamos un tema personalizado para asegurar que los estilos se apliquen correctamente
const theme = createTheme();

const defaultCarData = {
  VehiculoID: 1,
  Tipo: "Carro",
  Modelo: "Toyota Corolla",
  Color: "Rojo",
  Kilometraje: 15000,
  Valor: 20000,
  FechaRegistro: "2024-01-15T00:00:00.000Z",
  Estado: "Disponible",
  CarroID: 1,
  Cilindraje: null,
  NumeroVelocidades: null,
  imagen: "https://moto.suzuki.es/assets/img/image-moto-slider-home-1.png",
};

export default function CarInfoCard({ carData }) {
  const car = carData || defaultCarData;

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardHeader title={car.Modelo} subheader={`ID: ${car.VehiculoID}`} />
        <CardMedia
          component="img"
          height="194"
          image={car.imagen}
          alt={car.Modelo}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Tipo: {car.Tipo}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Color: {car.Color}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Speed /> Kilometraje: {car.Kilometraje.toLocaleString()} km
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AttachMoney /> Valor: ${car.Valor.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CalendarToday /> Fecha de Registro:{" "}
                {new Date(car.FechaRegistro).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Chip
                label={car.Estado}
                color={car.Estado === "Disponible" ? "success" : "error"}
                size="small"
              />
            </Grid>
            {car.Cilindraje && (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocalGasStation /> Cilindraje: {car.Cilindraje} cc
                </Typography>
              </Grid>
            )}
            {car.NumeroVelocidades && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Velocidades: {car.NumeroVelocidades}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
