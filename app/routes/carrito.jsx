import React from "react";
import { useOutletContext } from "@remix-run/react";

import styles from "~/styles/carrito.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta() {
  return [
    {
      title: "GuitarraLA - Carrito de Compras",
      description: "Venta de Guitarras, Música, Blog, Carrito de Compras",
    },
  ];
}
const CANTIDAD_GUITARRAS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Carrito = () => {
  const { carrito, actualizarCantidad } = useOutletContext();
  return (
    <main className="contenedor">
      <h1 className="heading">Carrito de Compras</h1>
      <div className="contenido">
        <div className="carrito">
          <h2>Articulos</h2>
          {carrito.length === 0
            ? "Carrito vacio"
            : carrito.map((producto) => (
                <div key={producto.id} className="producto">
                  <div>
                    <img
                      className="imagen"
                      src={producto.imagen}
                      alt={`Imagen del producto ${producto.nombre}`}
                    />
                  </div>
                  <div>
                    <p className="nombre">{producto.nombre}</p>
                    <p className="cantidad">Cantidad:</p>
                    <select
                      className="select"
                      name=""
                      id=""
                      value={producto.cantidad}
                      onChange={(e) =>
                        actualizarCantidad({
                          cantidad: parseInt(e.target.value),
                          id: producto.id,
                        })
                      }
                    >
                      {CANTIDAD_GUITARRAS.map((cantidad) => (
                        <option value={cantidad} key={cantidad}>
                          {cantidad}
                        </option>
                      ))}
                    </select>
                    <p className="precio">
                      Precio unidad: <span>$ {producto.precio}</span>
                    </p>
                    <p className="subtotal">
                      {" "}
                      Subtotal:
                      <span>$ {producto.cantidad * producto.precio}</span>
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <aside className="resumen">
          <h3>Resumen del pedido</h3>
          <p>Total a Pagar: $</p>
        </aside>
      </div>
    </main>
  );
};

export default Carrito;
