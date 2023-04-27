import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";
import ListadoGuitarra from "~/components/listado-guitarras";

import stylesGuitarras from "~/styles/guitarras.css";

export function meta() {
  return [];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: stylesGuitarras,
    },
  ];
}

export async function loader() {
  const [guitarras, posts] = await Promise.all([getGuitarras(), getPosts()]);

  // console.log(guitarras);
  // console.log(posts);
  return { guitarras: guitarras.data, posts: posts.data };
}

const Index = () => {
  const { guitarras, posts } = useLoaderData();
  return (
    <>
      <main className="contenedor">
        <ListadoGuitarra guitarras={guitarras} />
      </main>
    </>
  );
};

export default Index;
