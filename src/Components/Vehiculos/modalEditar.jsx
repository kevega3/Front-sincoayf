import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAlert } from "../Context/alertContext";
import { VehiculoContext } from "../Context/vehiculosContext";
import { Editarvehiculo } from "../Services/vehiculoServices";
import {
  Button,
  TextField,
  Box,
  Modal,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

function ModalEditar(props) {
  const { handlerVehiculos } = useContext(VehiculoContext);

  const [formData, setFormData] = useState({
    idCarro: props.datosIniciales.CarroID,
    tipo: props.datosIniciales.Tipo,
    modelo: props.datosIniciales.Modelo,
    cilindraje: props.datosIniciales.Cilindraje,
    numeroVelocidades: props.datosIniciales.NumeroVelocidades,
    color: props.datosIniciales.Color,
    kilometraje: props.datosIniciales.Kilometraje,
    valor: props.datosIniciales.Valor,
    imagen: props.datosIniciales.Imagen,
    estado: props.datosIniciales.Estado,
    FechaRegistro: props.datosIniciales.FechaRegistro,
    VehiculoID: props.datosIniciales.VehiculoID,
  });

  const [errors, setErrors] = useState({
    tipo: "",
    modelo: "",
    cilindraje: "",
    numeroVelocidades: "",
    color: "",
    kilometraje: "",
    valor: "",
    imagen: "",
    estado: "",
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2196f3", // Azul
      },
      background: {
        default: "#ffffff", // Blanco
      },
      error: {
        main: "#f44336", //  errores
      },
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #e4e4e4",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const { alertas } = useAlert();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "tipo":
        if (!value) error = "El tipo es requerido";
        break;
      case "modelo":
        if (!value) error = "El modelo es requerido";
        break;
      case "cilindraje":
        if (!value) error = "El cilindraje es requerido";
        else if (isNaN(Number(value)))
          error = "El cilindraje debe ser un número";
        break;
      case "numeroVelocidades":
        if (!value) error = "El número de velocidades es requerido";
        else if (isNaN(Number(value)))
          error = "El número de velocidades debe ser un número";
        break;
      case "color":
        if (!value) error = "El color es requerido";
        break;
      case "kilometraje":
        if (!value) error = "El kilometraje es requerido";
        else if (isNaN(Number(value)))
          error = "El kilometraje debe ser un número";
        break;
      case "valor":
        if (!value) error = "El valor es requerido";
        else if (isNaN(Number(value)))
          error = "El valor debe ser un número decimal";
        break;
      case "imagen":
        if (!value) error = "La URL de la imagen es requerida";
        break;
      case "estado":
        if (!value) error = "Esta opcion es requerida";
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newErrors = {};
      let hasErrors = false;

      Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) hasErrors = true;
      });

      setErrors(newErrors);

      if (!hasErrors) {
        console.log("Formulario Editar", formData);
        const { data: response } = await Editarvehiculo(formData);

        alertas("success", response.ayuda, "Edicion exitosa!");
        handleClose(true);
        await handlerVehiculos(); // nos traemos nuevamente los vehiculos
      }
    } catch (error) {
      let errores = error.response.data?.ayuda || error.message;
      alertas(
        "error",
        `Error ${errores}`,
        "El sistema no le deja ingresar el nuevo vehiculo"
      );
    }
  };

  return (
    <>
      <div>
        <IconButton
          onClick={handleOpen}
          style={{ background: "#E8B326", border: "1px solid #e4e4e4" }}
        >
          <EditIcon color="black" />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ mb: 3, color: "primary.main" }}
                  >
                    Editar Vehículo N°{formData.id}
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.tipo}
                    >
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        label="Tipo"
                      >
                        <MenuItem value="Carro">Carro</MenuItem>
                        <MenuItem value="Moto">Moto</MenuItem>
                      </Select>
                      <FormHelperText>{errors.tipo}</FormHelperText>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="modelo"
                      label="Modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      error={!!errors.modelo}
                      helperText={errors.modelo}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="cilindraje"
                      label="Cilindraje"
                      type="number"
                      value={formData.cilindraje}
                      onChange={handleChange}
                      error={!!errors.cilindraje}
                      helperText={errors.cilindraje}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="numeroVelocidades"
                      label="Número de Velocidades"
                      type="number"
                      value={formData.numeroVelocidades}
                      onChange={handleChange}
                      error={!!errors.numeroVelocidades}
                      helperText={errors.numeroVelocidades}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="color"
                      label="Color"
                      value={formData.color}
                      onChange={handleChange}
                      error={!!errors.color}
                      helperText={errors.color}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="kilometraje"
                      label="Kilometraje"
                      type="number"
                      value={formData.kilometraje}
                      onChange={handleChange}
                      error={!!errors.kilometraje}
                      helperText={errors.kilometraje}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="valor"
                      label="Valor"
                      type="number"
                      inputProps={{ step: "0.01" }}
                      value={formData.valor}
                      onChange={handleChange}
                      error={!!errors.valor}
                      helperText={errors.valor}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="imagen"
                      label="URL de la Imagen"
                      value={formData.imagen}
                      onChange={handleChange}
                      error={!!errors.imagen}
                      helperText={errors.imagen}
                    />

                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.tipo}
                    >
                      <InputLabel>Estado</InputLabel>
                      <Select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        label="Estado"
                      >
                        <MenuItem value="Nuevo">Nuevo</MenuItem>
                        <MenuItem value="Usado">Usado</MenuItem>
                      </Select>
                      <FormHelperText>{errors.tipo}</FormHelperText>
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Enviar
                    </Button>
                  </form>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ModalEditar;
