import { useAppContext } from "../context/AppContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#3498db" : props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "#2980b9" : props.danger ? "#c0392b" : "#27ae60")};
  }
`;

const Cart = () => {
  const { cart, favorites, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <Container>
      <h1>🛒 Carrito de Adopciones</h1>
      {cart.length === 0 ? (
        <>
          <p>No hay gatitos en el carrito.</p>
          <Button primary onClick={() => navigate("/")}>🏠 Volver a Inicio</Button>
        </>
      ) : (
        cart.map((cat) => (
          <CartItem key={cat.id}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Image src={cat.image} alt={cat.name} />
              <div>
                <h3>{cat.name}</h3>
                <p>{favorites.some((fav) => fav.id === cat.id) ? "⭐ Favorito" : "🤍 No es favorito"}</p>
              </div>
            </div>
            <ButtonsContainer>
              <Button danger onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: cat.id })}>
                ❌ Quitar del carrito
              </Button>
              <Button onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: cat })}>
                {favorites.some((fav) => fav.id === cat.id) ? "❤️ Quitar Me Gusta" : "🤍 Me Gusta"}
              </Button>
            </ButtonsContainer>
          </CartItem>
        ))
      )}
      <Button primary onClick={() => navigate("/")}>🏠 Volver a Inicio</Button>
    </Container>
  );
};

export default Cart;
