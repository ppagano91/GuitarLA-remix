import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getGuitarra } from "~/models/guitarras.server";
import styles from "~/styles/guitarras.css";

export function meta({ data }) {
  // 1ºdata es de Remix, 2º data es de Strapi
  // console.log(data.data);
  return [
    {
      title: `GuitarraLA - ${data.data[0].attributes.nombre}`,
      description: `GuitarraLA - Venta de guirarras, gitarra ${data.data[0].attributes.nombre}`,
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export async function loader({ request, params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  return guitarra;
}

const Guitarra = () => {
  const guitarra = useLoaderData();
  const { descripcion, imagen, precio, nombre } = guitarra.data[0].attributes;
  return (
    <main className="contenedor guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen de la guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">$ {precio}</p>
      </div>
    </main>
  );
};

export default Guitarra;
