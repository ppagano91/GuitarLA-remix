import { useLoaderData } from "@remix-run/react";
import React from "react";
import { formatearFecha } from "~/utils/helpers";
import { getPost } from "~/models/posts.server";

export function meta({ data }) {
  if (data === undefined) {
    return [
      {
        title: `GuitarLA - Entrada no encontrada`,
        description: `GuitarraLA - Venta de guirarras, entrada no encontrada`,
      },
    ];
  }
  // 1ºdata es de Remix, 2º data es de Strapi
  // console.log(data.data);
  return [
    {
      title: `GuitarraLA - ${data.data[0].attributes.titulo}`,
      description: `GuitarraLA - Venta de guirarras, entrada ${data.data[0].attributes.titulo}`,
    },
  ];
}

export async function loader({ params }) {
  const { postUrl } = params;
  // console.log(postUrl);
  const post = await getPost(postUrl);
  // console.log(post);
  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });
  }
  return post;
}

const Post = () => {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post?.data[0].attributes;
  console.log(post);
  return (
    <article className="post item mt-3">
      <img
        className="imagen"
        src={imagen?.data.attributes.url}
        alt={`Imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
};

export default Post;
