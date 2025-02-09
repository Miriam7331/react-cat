import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#3498db" : props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
  border: none;
  padding: 8px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "#2980b9" : props.danger ? "#c0392b" : "#27ae60")};
  }
`;

const Home = () => {
  const [cats, setCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const catsPerPage = 8;
  const navigate = useNavigate();
  const { cart, favorites, dispatch } = useAppContext();

  useEffect(() => {
    const getCats = async () => {
      const data = await fetchProducts();
      setCats(data);
    };
    getCats();
  }, []);

  const currentCats = cats.slice((currentPage - 1) * catsPerPage, currentPage * catsPerPage);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🐱 Razas de Gatos</h1>

      {cats.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>Cargando razas...</p>
      ) : (
        <>
          <Grid>
            {currentCats.map((cat) => (
              <Card key={cat.id}>
                <h3>{cat.name}</h3>
                {cat.image && <Image src={cat.image} alt={cat.name} />}
                <Button primary onClick={() => navigate(`/product/${cat.id}`, { state: { cat } })}>
                  Ver detalles
                </Button>
                <Button 
                  onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: cat })}
                >
                  {favorites.some((fav) => fav.id === cat.id) ? "❤️ Quitar Me Gusta" : "🤍 Me Gusta"}
                </Button>
                {cart.some((item) => item.id === cat.id) ? (
                  <Button danger onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: cat.id })}>
                    ❌ Quitar del carrito
                  </Button>
                ) : (
                  <Button onClick={() => dispatch({ type: "ADD_TO_CART", payload: cat })}>
                    🛒 Adoptar
                  </Button>
                )}
              </Card>
            ))}
          </Grid>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Anterior
            </Button>
            <Button disabled={currentPage * catsPerPage >= cats.length} onClick={() => setCurrentPage(currentPage + 1)}>
              Siguiente
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
