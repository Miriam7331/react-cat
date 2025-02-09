import { useAppContext } from "../context/AppContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#3498db" : "red")};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "#2980b9" : "darkred")};
  }
`;

const Cart = () => {
  const { cart, dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <Container>
      <h1>🛒 Carrito de Adopciones</h1>
      {cart.length === 0 ? (
        <p>No hay gatitos en el carrito.</p>
      ) : (
        cart.map((cat) => (
          <div key={cat.id} style={{ marginBottom: "15px" }}>
            <h3>{cat.name}</h3>
            <Button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: cat.id })}>
              ❌ Quitar del carrito
            </Button>
          </div>
        ))
      )}
      <Button primary onClick={() => navigate("/")}>🏠 Volver a Inicio</Button>
    </Container>
  );
};

export default Cart;
