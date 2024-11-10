import React, { createContext, useState, useContext } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

// Crear el contexto
const AlertContext = createContext();

// Crear un provider
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    severity: "info",
    title: "",
    message: "",
  });
  const [duracion, setDuracion] = useState(1000);

  // Función para mostrar alertas
  const alertas = (severity, title, message) => {
    setAlert({
      open: true,
      severity,
      title,
      message,
    });

    severity === "error" ? setDuracion(6000) : setDuracion(3000);
  };

  // Función para cerrar alertas
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ alertas }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={duracion}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

// Mi Hook personalizado para usar el contexto
export const useAlert = () => {
  return useContext(AlertContext);
};
