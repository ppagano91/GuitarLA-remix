import { Link } from "@remix-run/react";
import React from "react";

const Post = ({ post }) => {
  const { contenido, imagen, titulo, url, publishedAt } = post;
  return (
    <article>
      <img
        className="imagen"
        src={imagen.data.attributes.formats.small.url}
        alt={`Imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{publishedAt}</p>
        <p className="resumen">{contenido}</p>
        <Link className="enlace" to={`posts/${url}`}>
          Leer Post
        </Link>
      </div>
    </article>
  );
};

export default Post;
