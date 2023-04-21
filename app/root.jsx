import { Meta, Links } from "@remix-run/react";
import styles from "./styles/index.css";

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
      href: styles,
    },
  ];
}
/* eslint-enable */

export default function App() {
  return <Document>Hola</Document>;
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}
