import React from "react";

import AppContext from "../context";

function Info({ title, image, description }) {

    const { setCartOpened } = React.useContext(AppContext)

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img
                className="mb-20"
                width="120px"
                src={image}
                alt="Cart empty"
              />
              <h2>{title}</h2>
              <p className="opacity-4">
                 {description}
              </p>
              <button onClick={() => setCartOpened(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
    )
}

export default Info;