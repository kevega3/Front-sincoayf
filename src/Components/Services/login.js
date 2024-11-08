import axios from "./axioServices";

export function Getlogin(carrito) {
  return axios.post("Usuario", carrito);
}
