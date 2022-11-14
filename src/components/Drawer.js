import React from "react";

function Drawer({ onClose, onRemove, items = []}) {

    return (
      <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-30">
            Корзина
            <img
              onClick={onClose}
              className="cu-p"
              src="/img/btn-delete.svg"
              alt="Close"
            />
          </h2>

          {items.length > 0 ? (
            <div>
              <div className="items mb-35">
                {items.map((obj) => (
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${obj.imageURL})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} UAH</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src="/img/btn-delete.svg"
                      alt="Remove"
                    />
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого: </span>
                    <div></div>
                    <b>7088 UAH</b>
                  </li>
                  <li>
                    <span>Налог 5%: </span>
                    <div></div>
                    <b>354 UAH</b>
                  </li>
                </ul>
                <button className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img
                height="120px"
                width="120px"
                src="/img/cart-empty.jpg"
                alt="Cart empty"
              />
              <h2>Корзина пустая</h2>
              <p className="opacity-4">
                Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
              </p>
              <button onClick={onClose} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

export default Drawer;