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
  width: 50px;
  height: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    background: #2980b9;
    color: white;
  }
`;

const Badge = styled.span`
  background: red;
  color: white;
  font-size: 14px;
  padding: 3px 7px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
`;

const Layout = () => {
  const { cart } = useAppContext();

  return (
    <div>
      <Header>
        <h1>🐱 Adopción de Gatitos</h1>
        <CartIcon to="/cart">
          🛒
          {cart.length > 0 && <Badge>{cart.length}</Badge>}
        </CartIcon>
      </Header>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
