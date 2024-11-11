import axios from "./axioServices";

export function AgregarVenta(body) {
  return axios.post("Ventas/Agregar", body);
}

export async function getVentas() {
  return axios.get("Ventas");
}
