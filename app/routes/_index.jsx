import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";

import ListadoGuitarra from "~/components/listado-guitarras";
import stylesGuitarras from "~/styles/guitarras.css";

import ListadoPosts from "../components/listado-posts";
import stylesPosts from "~/styles/blog.css";

export function meta() {
  return [];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: stylesGuitarras,
    },
    {
      rel: "stylesheet",
      href: stylesPosts,
    },
  ];
}

export async function loader() {
  const [guitarras, posts] = await Promise.all([getGuitarras(), getPosts()]);
  return { guitarras: guitarras.data, posts: posts.data };
}

const Index = () => {
  const { guitarras, posts } = useLoaderData();
  return (
    <>
      <section className="contenedor">
        <ListadoGuitarra guitarras={guitarras} />
      </section>
      <section className="contenedor">
        <ListadoPosts posts={posts} />
      </section>
    </>
  );
};

export default Index;
