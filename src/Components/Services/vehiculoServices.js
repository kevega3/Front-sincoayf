import axios from "./axioServices";

export function Getvehiculo() {
  return axios.get("Vehiculos");
}

export function Addvehiculo(body) {
  return axios.post("Vehiculos/crear", body);
}