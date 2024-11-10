import axios from "./axioServices";

export function GetListaPrecios() {
  return axios.get("listaPrecios");
}
