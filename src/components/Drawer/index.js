import React from "react";
import axios from 'axios';

import Info from "../Info";

import AppContext from '../../context';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened}) {

  const { cartItems, setCartItems } = React.useContext(AppContext)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [orderId, setOrderId] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post('https://635291eca9f3f34c3741e133.mockapi.io/orders', {
        items: cartItems
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://635291eca9f3f34c3741e133.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      window.alert('Ошибка при оформлении заказа!');
    }
    setIsLoading(false)
  }

    return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>       
       <div className={styles.drawer}>
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
            <div className="d-flex flex-column flex">
              <div className="items flex">
                {items.map((obj) => (
                  <div
                    key={obj.id}
                    className="cartItem d-flex align-center mb-20"
                  >
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
                    <b>{totalPrice} UAH</b>
                  </li>
                  <li>
                    <span>Налог 5%: </span>
                    <div></div>
                    <b>{Math.round(totalPrice/ 100 * 5)} UAH</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/cart-empty.jpg"}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            />
          )}
        </div>
      </div>
    );
}

export default Drawer;