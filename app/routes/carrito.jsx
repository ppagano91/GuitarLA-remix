import React from "react";
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
const Carrito = () => {
  return (
    <main className="contenedor">
      <h1 className="heading">Carrito de Compras</h1>
      <div className="contenido">
        <div className="carrito">
          <h2>Articulos</h2>
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
