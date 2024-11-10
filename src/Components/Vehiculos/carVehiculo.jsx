import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ModalEditar from "./modalEditar";
import ModalVender from "./modalVender";
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

const theme = createTheme();
export default function CartaVehiculo(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 300, m: 2 }}>
        <CardHeader
          title={props.datos.Modelo}
          subheader={`ID: ${props.datos.VehiculoID}`}
        />
        <CardMedia
          component="img"
          height="190"
          image={props.datos.Imagen}
          alt={props.datos.Modelo}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Tipo: {props.datos.Tipo}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Color: {props.datos.Color}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Speed /> Kilometraje:{" "}
                {props.datos.Kilometraje.toLocaleString()} km
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AttachMoney /> Valor: ${props.datos.Valor.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CalendarToday /> Fecha de Registro:{" "}
                {new Date(props.datos.FechaRegistro).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Chip
                label={props.datos.Estado}
                color={props.datos.Estado === "Nuevo" ? "success" : "warning"}
                size="small"
              />
            </Grid>
            {props.datos.Cilindraje && (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocalGasStation /> Cilindraje: {props.datos.Cilindraje} cc
                </Typography>
              </Grid>
            )}
            {props.datos.NumeroVelocidades && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Velocidades: {props.datos.NumeroVelocidades}
                </Typography>
              </Grid>
            )}

            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                justifyItems: "center",
                margin: "auto",
                paddingTop: "30px",
              }}
            >
              <ModalEditar datosIniciales={props.datos} />
              &nbsp; &nbsp;&nbsp;
              <ModalVender datosIniciales={props.datos} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
