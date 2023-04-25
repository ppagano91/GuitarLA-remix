import React from "react";
import { Link } from "@remix-run/react";

const Guitarra = ({ guitarra }) => {
  const { descripcion, imagen, precio, url, nombre } = guitarra;
  const img = imagen.data.attributes.formats.medium.url;
  return (
    <div className="guitarra">
      <img src={img} alt={`Imagen guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>
        <Link className="enlace" to={`guitarra/${url}`}>
          Ver Producto
        </Link>
      </div>
    </div>
  );
};

export default Guitarra;
