import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import React from "react";
import { getGuitarra } from "~/models/guitarras.server";
import Modal from "~/components/modal";

export async function loader({ request, params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);
  // console.log("guitarra", guitarra);

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

const CANTIDAD_GUITARRAS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Guitarra = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const { agregarCarrito } = useOutletContext();
  const [cantidad, setCantidad] = useState(0);
  const guitarra = useLoaderData();
  const { descripcion, imagen, precio, nombre } = guitarra.data[0].attributes;

  const handleSumbit = (e) => {
    e.preventDefault();
    if (cantidad < 1) {
      alert("Debes seleccionar una cantidad");
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    };
    agregarCarrito(guitarraSeleccionada);
    setMostrarModal(true);
    setTimeout(() => {
      setMostrarModal(false);
    }, 3000); // 3000 milisegundos = 3 segundos
  };

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
        <form onSubmit={handleSumbit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          <select
            name="cantidad"
            id="cantidad"
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          >
            <option value="0">--- Seleccione ---</option>
            {CANTIDAD_GUITARRAS?.map((cantidad) => (
              <option value={cantidad} key={cantidad}>
                {cantidad}
              </option>
            ))}
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
        {mostrarModal && <Modal></Modal>}
      </div>
    </div>
  );
};

export default Guitarra;
