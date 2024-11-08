import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Getlogin } from "../Services/login";
import { useAlert } from "../Context/alertContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Azul
    },
    background: {
      default: "#ffffff", // Blanco
    },
    error: {
      main: "#f44336", // Rojo para errores
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { alertas } = useAlert();
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("El correo electrónico es requerido");
    } else if (!re.test(email)) {
      setEmailError("Ingrese un correo electrónico válido");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("La contraseña es requerida");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      validateEmail(email);
      validatePassword(password);
      if (!emailError && !passwordError && email && password) {
        let body = {
          email: email,
          password: password,
        };
        const response = await Getlogin(body);
        alertas("success", "Bienvenido", "Logeo Exitoso!");
        console.log(response.data.data);
        localStorage.setItem("datos", JSON.stringify(response.data.data));
        navigate("/gestion/");
      }
    } catch (error) {
      let errores = error.response?.data?.ayuda || error.message;
      alertas("error", "Error al iniciar sesión", `${errores}`);
    }
  };

  return (
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
          <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 3, color: "primary.main" }}
            >
              Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
