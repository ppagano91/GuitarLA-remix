import React, { useState, useEffect } from "react";
import { useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils";

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
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito?.length === 0
                ? "Carrito vacio"
                : carrito?.map((producto) => (
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
                      <button
                        type="button"
                        className="btn-eliminar"
                        onClick={() => eliminarGuitarra(producto.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a Pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito;
