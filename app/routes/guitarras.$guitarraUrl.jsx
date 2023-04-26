import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getGuitarra } from "~/models/guitarras.server";
export async function loader({ request, params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  return guitarra;
}

const Guitarra = () => {
  const guitarra = useLoaderData();
  return <div>$guitarraUrl</div>;
};

export default Guitarra;
