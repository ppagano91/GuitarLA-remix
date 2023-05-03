import { useState, useEffect } from "react";
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

/* eslint-disable */
export function meta() {
  return [
    {
      charset: "utf-8",
      title: "GuitarLA - Remix",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap",
    },
  ];
}
/* eslint-enable */

export default function App() {
  const carritoLocalStorage =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : null;

  const [carrito, setCarrito] = useState(carritoLocalStorage);

  // Si se coloca el localstorage en el useEffect, se ejecutará para la parte del cliente del de Remix y no en el servidor
  // Si se coloca el localstorage en el useEffect, se ejecutará para la parte del cliente del de Remix y en el servidor, pero en el servidor no existe y se generará un error
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    // console.log("Agregando guitarra", guitarra);
    // carrito.some(...): retorna true si al menos un elemento cumpla la condición, es decir, existe en el array
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Iterar sobre el arreglo "carrito" e identicar el elemento duplicado
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          //Opción 1: Reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad;
          // Opción 2: Sumar la cantidad
          // guitarraState.cantidad += guitarra.cantidad;
        }
        return guitarraState;
      });
      // Añadir a Carrito
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };
  const eliminarGuitarra = (id) => {
    // console.log("Eliminando guitarra", id);
    const carritoActualizado = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    setCarrito(carritoActualizado);
  };
  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/**
 * Manejo de errores
 */
// export function CatchBoundary() {
//   const error = useCatch();
//   return (
//     <Document>
//       {/* <h1>¡Ups! Algo salió mal</h1> */}
//       <p className="error">
//         {error.status} {error.statusText}
//       </p>
//     </Document>
//   );
// }
// export function ErrorBoundary({ error }) {
//   return (
//     <Document>
//       <p className="error">
//         {error.status} {error.statusText}
//       </p>
//     </Document>
//   );
// }

export function CatchBoundary() {
  const error = useCatch(); // esto es un hook de remix

  return (
    <Document>
      {/* de esta manera imprimimos los errores */}
      <p className="error">
        {error.status} {error.statusText}{" "}
      </p>
      <Link className="error-enlace" to="/">
        Volver a la página de Inicio
      </Link>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError(); // esto es un hook de remix

  return (
    <Document>
      {/* de esta manera imprimimos los errores */}
      <p className="error">
        {error.status} {error.statusText}{" "}
      </p>
      <Link className="error-enlace" to="/">
        Volver a la página de Inicio
      </Link>
    </Document>
  );
}
