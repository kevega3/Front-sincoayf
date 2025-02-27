import React, { useState, useContext, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Addvehiculo } from "../Services/vehiculoServices";
import { useAlert } from "../Context/alertContext";
import { VehiculoContext } from "../Context/vehiculosContext";
import { ListaPreciosContext } from "../Context/listaVentasContext";

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
  Grid,
  Autocomplete,
} from "@mui/material";

// Estilos para el modal
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

export default function ModalCrearVehiculo() {
  const { handlerVehiculos } = useContext(VehiculoContext);
  const { ListaPrecios } = useContext(ListaPreciosContext);
  const { alertas } = useAlert();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [formData, setFormData] = useState({
    tipo: "",
    modelo: "",
    cilindraje: "",
    numeroVelocidades: "",
    color: "",
    kilometraje: "",
    valor: "",
    valorBD: "",
    imagen: "",
    estado: "",
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

  useEffect(() => {
    if (formData.modelo) {
      const selectedItem = ListaPrecios.find(
        (item) => item.Modelo === formData.modelo
      );

      if (selectedItem) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          valorBD: selectedItem.Valor,
          valor: selectedItem.Valor,
        }));
      }
    }
  }, [formData.modelo, ListaPrecios]);
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
        let body = formData;
        // body.valorBD = formData.valor;
        console.log("body");
        console.log(body);
        const { data: response } = await Addvehiculo(body);
        alertas("success", response.data, "Proceso Exitoso!");
        setFormData({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="success">
        <AddIcon /> Agregar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
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
                  Agregar nuevo vehículo
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={!!errors.modelo}
                      >
                        <Autocomplete
                          options={ListaPrecios.map((item) => item.Modelo)}
                          value={formData.modelo || ""}
                          onChange={(event, newValue) => {
                            const selectedItem = ListaPrecios.find(
                              (item) => item.Modelo === newValue
                            );
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              modelo: newValue || "",
                              valor:
                                selectedItem && selectedItem.valor
                                  ? selectedItem.valor
                                  : "",
                            }));
                          }}
                          onInputChange={(event, newInputValue) => {
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              modelo: newInputValue || "",
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Modelo"
                              name="modelo"
                              error={!!errors.modelo}
                              helperText={errors.modelo}
                            />
                          )}
                          filterOptions={(options, { inputValue }) =>
                            options.filter((option) =>
                              option
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            )
                          }
                        />
                      </FormControl>
                    </Grid>

                    {formData.estado === "Nuevo" ? (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="valor"
                          label="Valor"
                          value={formData.valor}
                          disabled
                          error={!!errors.valor}
                          helperText={errors.valor}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={6}>
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
                      </Grid>
                    )}
                    {/* <Grid item xs={12} sm={6}>
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
                    </Grid> */}

                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={12}>
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
                    </Grid>
                  </Grid>
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
  );
}
