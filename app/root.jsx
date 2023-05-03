import { useState } from "react";
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
  const [carrito, setCarrito] = useState([]);
  const agregarCarrito = (guitarra) => {
    console.log("Agregando guitarra", guitarra);
    setCarrito([...carrito, guitarra]);
  };
  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
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
