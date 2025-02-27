import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/header";
import { VehiculoProvider } from "./Components/Context/vehiculosContext";
import { ListaPreciosProvider } from "./Components/Context/listaVentasContext";
import Body from "./Components/Body/body";
import Footer from "./Components/Footer/footer";

import { AlertProvider } from "./Components/Context/alertContext";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <VehiculoProvider>
          <ListaPreciosProvider>
            <div className="wrapper">
              <div className="content">
                <Header />
                <Body />
              </div>
              <Footer className="footer" />
            </div>
          </ListaPreciosProvider>
        </VehiculoProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
