import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
