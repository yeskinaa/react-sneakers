import Card from '../components/Card'

function Favorites({ items, onAddToFavorite }) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            Мои закладки
          </h1>
          <div className="search-Block d-flex">
            
          </div>
        </div>

        <div className="d-flex flex-wrap">
        {items
            .map((item, index) => (
              <Card
                id={item.id}
                key={index}
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
                onFavorite={(obj) => onAddToFavorite(obj)}
                favorite={true}
              />
            ))}
        </div>
      </div>
    )
}

export default Favorites;