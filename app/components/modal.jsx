import React from "react";
import imagen from "../../public/img/producto_agregado.jpg";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const Modal = () => {
  return (
    <div className="modal-background">
      <div className="modal">
        <p>Has agregado un nuevo producto al Carrito</p>
        {/* <img src={imagen} /> */}
        {/* <button type="button" className="close-btn">
          X
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
