import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter(
        (cat) => cat.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };

    case "TOGGLE_FAVORITE":
      let updatedFavorites;
      if (state.favorites.some((cat) => cat.id === action.payload.id)) {
        updatedFavorites = state.favorites.filter(
          (cat) => cat.id !== action.payload.id
        );
      } else {
        updatedFavorites = [...state.favorites, action.payload];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.cart, state.favorites]);

  // Funciones para manejar carrito y favoritos
  const addToCart = (cat) => dispatch({ type: "ADD_TO_CART", payload: cat });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const toggleFavorite = (cat) =>
    dispatch({ type: "TOGGLE_FAVORITE", payload: cat });
  const getCartCount = () => state.cart.length; // Devuelve la cantidad de gatitos en el carrito

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        favorites: state.favorites,
        addToCart,
        removeFromCart,
        toggleFavorite,
        getCartCount, // Agregamos la nueva función
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
