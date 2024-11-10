import React, { useEffect, createContext, useState } from "react";
import { GetListaPrecios } from "../Services/listaVentas";

export const ListaPreciosContext = createContext();

export const ListaPreciosProvider = (props) => {
  const [ListaPrecios, setListaPrecios] = useState([]);
  const handlerListaPrecios = async () => {
    try {
      const { data: resposne } = await GetListaPrecios();
      setListaPrecios(resposne);
    } catch (error) {
      console.error("Error al obtener lista:", error);
    }
  };

  useEffect(() => {
    handlerListaPrecios();
  }, []);

  return (
    <ListaPreciosContext.Provider
      value={{
        ListaPrecios,
        handlerListaPrecios,
      }}
    >
      {props.children}
    </ListaPreciosContext.Provider>
  );
};
