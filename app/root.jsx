import { Meta } from "@remix-run/react";

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
/* eslint-enable */

export default function App() {
  return <Document>Hola</Document>;
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
      </head>
      <body>{children}</body>
    </html>
  );
}
