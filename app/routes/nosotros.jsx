import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
  return [
    {
      charset: "utf-8",
      title: "GuitarLA - Nosotros",
      description: "Conoce más sobre nosotros",
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
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis
            justo eu est fermentum sagittis. Etiam tristique, mi ut commodo
            accumsan, lectus dui ultrices justo, id dictum dolor odio nec arcu.
            Fusce non ipsum turpis. Integer ut sodales arcu, ac accumsan sem.
            Vivamus nibh ante, pulvinar a pretium et, rutrum quis dui. Nunc a
            tincidunt nulla. Vestibulum volutpat rhoncus neque, eget porttitor
            risus ultricies non.
          </p>
          <p>
            Suspendisse tincidunt condimentum mi, id pulvinar neque tempus
            pellentesque. Sed sit amet quam porta, aliquam nibh vel, semper
            urna. Morbi vestibulum facilisis justo at varius. Nullam nibh quam,
            fringilla sed accumsan vitae, facilisis sit amet libero. Vestibulum
            ut egestas justo, eget accumsan orci. Pellentesque posuere non nibh
            quis ornare.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
