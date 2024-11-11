import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAlert } from "../Context/alertContext";
import { VehiculoContext } from "../Context/vehiculosContext";
import { AgregarVenta } from "../Services/ventaServices";
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

function ModalVender(props) {
  const { handlerVehiculos } = useContext(VehiculoContext);
  const [dateString, setDateString] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });

    const input = event.target.value;
    const sanitizedInput = input.replace(/[^\d/]/g, "");

    // Automatically add slashes after day and month
    let formattedDate = sanitizedInput;
    if (sanitizedInput.length > 2 && sanitizedInput.charAt(2) !== "/") {
      formattedDate =
        sanitizedInput.slice(0, 2) + "/" + sanitizedInput.slice(2);
    }
    if (formattedDate.length > 5 && formattedDate.charAt(5) !== "/") {
      formattedDate = formattedDate.slice(0, 5) + "/" + formattedDate.slice(5);
    }
    formattedDate = formattedDate.slice(0, 10);
    setDateString(formattedDate);
  };
  const [formData, setFormData] = useState({
    nombre: "",
    idVehiculo: props.datosIniciales.VehiculoID,
    TipoDocumentoIdentidad: "",
    DocumentoIdentidad: "",
    Telefono: "",
    Email: "",
    Direccion: "",
    FechaNacimiento: "",
  });
  console.log("formData");

  console.log(formData);

  const [errors, setErrors] = useState({
    nombre: "",
    TipoDocumentoIdentidad: "",
    DocumentoIdentidad: "",
    Telefono: "",
    Email: "",
    Direccion: "",
    FechaNacimiento: "",
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
      case "nombre":
        if (!value) error = "El nombre es requerido";
        break;
      case "TipoDocumentoIdentidad":
        if (!value) error = "El TipoDocumentoIdentidad es requerido";
        break;
      case "DocumentoIdentidad":
        if (!value) error = "El DocumentoIdentidad es requerido";
        break;
      case "Telefono":
        if (!value) error = "El número de Telefono es requerido";

        break;
      case "Email":
        if (!value) error = "El Email es requerido";
        break;
      case "Direccion":
        if (!value) error = "La Direccion es requerido";

        break;
      case "FechaNacimiento":
        if (!value) error = "La FechaNacimiento  es requerido";
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
        const { data: response } = await AgregarVenta(formData);
        alertas("success", response.ayuda, "Venta Exitosa!");
        handleClose(true);
        setFormData({
          nombre: "",
          idVehiculo: "",
          TipoDocumentoIdentidad: "",
          DocumentoIdentidad: "",
          Telefono: "",
          Email: "",
          Direccion: "",
          FechaNacimiento: "",
        });
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
          style={{ background: "#339900", border: "1px solid #e4e4e4" }}
        >
          <AttachMoneyIcon color="black" />
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
                    Datos del Comprador N°{formData.idVehiculo}
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="nombre"
                      label="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      error={!!errors.nombre}
                      helperText={errors.nombre}
                    />
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.TipoDocumentoIdentidad}
                    >
                      <InputLabel>TipoDocumentoIdentidad</InputLabel>
                      <Select
                        name="TipoDocumentoIdentidad"
                        value={formData.TipoDocumentoIdentidad}
                        onChange={handleChange}
                        label="TipoDocumentoIdentidad"
                      >
                        <MenuItem value="CC">CC</MenuItem>
                        <MenuItem value="TI">TI</MenuItem>
                        <MenuItem value="AS">AS</MenuItem>
                        <MenuItem value="CD">CD</MenuItem>
                        <MenuItem value="CE">CE</MenuItem>
                        <MenuItem value="MS">MS</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.TipoDocumentoIdentidad}
                      </FormHelperText>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="DocumentoIdentidad"
                      label="DocumentoIdentidad"
                      type="number"
                      value={formData.DocumentoIdentidad}
                      onChange={handleChange}
                      error={!!errors.DocumentoIdentidad}
                      helperText={errors.DocumentoIdentidad}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="Telefono"
                      label="Telefono"
                      value={formData.Telefono}
                      onChange={handleChange}
                      error={!!errors.Telefono}
                      helperText={errors.Telefono}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="Email"
                      label="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      error={!!errors.Email}
                      helperText={errors.Email}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="Direccion"
                      label="Direccion"
                      inputProps={{ step: "0.01" }}
                      value={formData.Direccion}
                      onChange={handleChange}
                      error={!!errors.Direccion}
                      helperText={errors.Direccion}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="FechaNacimiento"
                      label="Fecha Nacimiento"
                      value={dateString}
                      onChange={handleInputChange}
                      placeholder="DD/MM/YYYY"
                      error={!!errors.FechaNacimiento}
                      helperText={errors.FechaNacimiento}
                    />

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

export default ModalVender;

// import React, { useState } from "react";

// import { TextField, Button, Box } from "@mui/material";

// // Change to default export
// const ModalVender = () => {
//   const [dateString, setDateString] = useState("");

//   const handleInputChange = (event) => {
//     const input = event.target.value;
//     // Allow only numbers and slashes
//     const sanitizedInput = input.replace(/[^\d/]/g, "");

//     // Automatically add slashes after day and month
//     let formattedDate = sanitizedInput;
//     if (sanitizedInput.length > 2 && sanitizedInput.charAt(2) !== "/") {
//       formattedDate =
//         sanitizedInput.slice(0, 2) + "/" + sanitizedInput.slice(2);
//     }
//     if (formattedDate.length > 5 && formattedDate.charAt(5) !== "/") {
//       formattedDate = formattedDate.slice(0, 5) + "/" + formattedDate.slice(5);
//     }

//     // Limit to 10 characters (DD/MM/YYYY)
//     formattedDate = formattedDate.slice(0, 10);

//     setDateString(formattedDate);
//   };

//   const handleSearch = () => {
//     if (isValidDate(dateString)) {
//       console.log("Searching for date:", dateString);
//       // Add your search logic here
//     } else {
//       console.log("Please enter a valid date in DD/MM/YYYY format");
//     }
//   };

//   const isValidDate = (dateStr) => {
//     const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
//     if (!regex.test(dateStr)) return false;

//     const [, day, month, year] = regex.exec(dateStr) || [];
//     const isoDate = `${year}-${month}-${day}`;
//     const date = new Date(isoDate);

//     return (
//       date.getFullYear() === parseInt(year, 10) &&
//       date.getMonth() === parseInt(month, 10) - 1 &&
//       date.getDate() === parseInt(day, 10)
//     );
//   };

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//       <TextField
//         label="Search Date"
//         variant="outlined"
//         value={dateString}
//         onChange={handleInputChange}
//         placeholder="DD/MM/YYYY"
//         inputProps={{ maxLength: 10 }}
//         aria-label="Enter date in DD/MM/YYYY format"
//       />
//     </Box>
//   );
// };

// // Change to default export
// export default ModalVender;
