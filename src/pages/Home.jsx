import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? Array(8).fill(<Card loading={isLoading}/>) : filtredItems).map((item, index) => (
      <Card
        id={item.id}
        key={index}
        title={item.title}
        price={item.price}
        imageURL={item.imageURL}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
      />
    ));
  }
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-Block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue ? (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-delete.svg"
              alt="Clear"
            />
          ) : null}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;