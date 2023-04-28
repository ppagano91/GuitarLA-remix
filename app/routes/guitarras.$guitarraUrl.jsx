import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getGuitarra } from "~/models/guitarras.server";

export async function loader({ request, params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);
  console.log("guitarra", guitarra);

  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada",
    });
  }
  return guitarra;
}

export function meta({ data }) {
  if (data === undefined) {
    return [
      {
        title: `GuitarraLA - Guitarra no encontrada`,
        description: `GuitarraLA - Venta de guitarras, guitarra no encontrada`,
      },
    ];
  }
  // 1ºdata es de Remix, 2º data es de Strapi
  // console.log(data.data);
  return [
    {
      title: `GuitarraLA - ${data.data[0].attributes.nombre}`,
      description: `GuitarraLA - Venta de guitarras, guitarra ${data.data[0].attributes.nombre}`,
    },
  ];
}

const Guitarra = () => {
  const guitarra = useLoaderData();
  const { descripcion, imagen, precio, nombre } = guitarra.data[0].attributes;
  return (
    <div className="guitarra item">
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
    </div>
  );
};

export default Guitarra;
