import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import ListadoGuitarras from "~/components/listado-guitarras";

export function meta() {
  return [
    {
      title: "GuitarraLA - Tienda de Guitarras",
      description: "GuitarraLA - Nuestra colección de guitarras",
    },
  ];
}

export async function loader() {
  const guitarras = await getGuitarras();
  // console.log(guitarras);

  return guitarras.data;
}

const Tienda = () => {
  const guitarras = useLoaderData();
  return <ListadoGuitarras guitarras={guitarras} />;
};

export default Tienda;
