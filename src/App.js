import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

export const AppContext = React.createContext({})

function App() {

  const [cartOpened, setCartOpened] = React.useState(false)
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://635291eca9f3f34c3741e133.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://635291eca9f3f34c3741e133.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://635291eca9f3f34c3741e133.mockapi.io/items"
      );

      setIsLoading(false);
      
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData()
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://635291eca9f3f34c3741e133.mockapi.io/cart/${obj.id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else
      axios.post('https://635291eca9f3f34c3741e133.mockapi.io/cart', obj)
        .then(res => setCartItems(prev => [...prev, res.data]))  
    } catch {
      alert("Извините, произошла ошибка")
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://635291eca9f3f34c3741e133.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://635291eca9f3f34c3741e133.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch {
      alert("Извините, произошла ошибка")
    }
  }

  const onRemoveItem = (id) => {
      axios.delete(`https://635291eca9f3f34c3741e133.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ cartItems, items, favorites,  onAddToFavorite, isItemAdded }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
            exact
          ></Route>

          <Route
            path="/favorites"
            element={
              <Favorites onAddToFavorite={onAddToFavorite} />
            }
            exact
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
