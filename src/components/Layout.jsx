import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

const Header = styled.header`
  background-color: #3498db;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CartIcon = styled(Link)`
  background: white;
  color: #3498db;
  padding: 10px;
  border-radius: 50%;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #2980b9;
    color: white;
  }
`;

const Layout = () => {
  const { cart } = useAppContext();

  return (
    <div>
      <Header>
        <h1>🐱 Adopción de Gatitos</h1>
        <CartIcon to="/cart">🛒 {cart.length}</CartIcon>
      </Header>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
