import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';

function Header(props) {

  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return (
      <header className="d-flex justify-between align-center">
        <Link to="/">
          <div className="d-flex align-center">
            <img width="40" height="40" src="/img/logo.png" alt="logo" />
            <div className="headerInfo">
              <h3 className="text-uppercase">Brooklyn Store</h3>
              <p className="opacity-4">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width="18" height="18" src="/img/cart.svg" alt="cart" />
            <span>{totalPrice} UAH</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img
                width="18"
                height="18"
                src="/img/favorites.svg"
                alt="favorites"
              />
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width="18" height="18" src="/img/user.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </header>
    );
}

export default Header;