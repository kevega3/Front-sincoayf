import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/header";
import Body from "./Components/Body/body";
import Footer from "./Components/Footer/footer";
import { AlertProvider } from "./Components/Context/alert";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <div className="wrapper">
          <div className="content">
            <Header />
            <Body />
          </div>
          <Footer className="footer" />
        </div>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// <div class="wrapper">
//       <div class="content">
//         <div id="root"></div>
//       </div>

//       <footer>
//         © 2024 Smart. Todos los derechos reservados.
//     </footer>
//     </div>
