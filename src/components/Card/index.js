import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

import { AppContext } from '../../App';

function Card({
  id,
  imageURL,
  title,
  price,
  onFavorite,
  onPlus,
  favorite = false,
  loading = false
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorite);


  const onClickPlus = () => {
    onPlus({ id, imageURL, title, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, imageURL, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              src={
                isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt="Unliked"
              onClick={onClickFavorite}
            />
          </div>
          <img width="100%" height="135" src={imageURL} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} UAH</b>
            </div>

            <img
              className={styles.plus}
              src={isItemAdded(id) ? "/img/btn-checkit.svg" : "/img/btn-addit.svg"}
              alt="buttonPlus"
              onClick={onClickPlus}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;