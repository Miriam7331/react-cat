import { useState, useEffect } from "react";
import { fetchProducts } from "../api/products";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  background: ${(props) =>
    props.primary ? "#3498db" : props.danger ? "#e74c3c" : "#2ecc71"};
  color: white;
  border: none;
  padding: 8px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.primary ? "#2980b9" : props.danger ? "#c0392b" : "#27ae60"};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Home = () => {
  const [cats, setCats] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const catsPerPage = 12; // Se muestran 12 gatos por página
  const navigate = useNavigate();
  const { cart, favorites, addToCart, removeFromCart, toggleFavorite } =
    useAppContext();

  useEffect(() => {
    const getCats = async () => {
      const data = await fetchProducts();
      setCats(data);
    };
    getCats();
  }, []);

  const handleSearch = (e) => {
    setSearchParams({ q: e.target.value });
  };

  // Filtrar y ordenar resultados
  const filteredCats = cats
    .filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const search = searchTerm.toLowerCase();
      const aStarts = a.name.toLowerCase().startsWith(search);
      const bStarts = b.name.toLowerCase().startsWith(search);
      return bStarts - aStarts;
    });

  // Paginación
  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = filteredCats.slice(indexOfFirstCat, indexOfLastCat);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🐱 Razas de Gatos
      </h1>

      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            outline: "none",
            textAlign: "center",
            fontSize: "16px",
          }}
        />
      </div>

      {currentCats.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No se encontraron razas.
        </p>
      ) : (
        <Grid>
          {currentCats.map((cat) => (
            <Card key={cat.id}>
              <h3>{cat.name}</h3>
              {cat.image && <Image src={cat.image} alt={cat.name} />}
              <Button
                primary
                onClick={() =>
                  navigate(`/product/${cat.id}`, { state: { cat } })
                }
              >
                Ver detalles
              </Button>
              <Button onClick={() => toggleFavorite(cat)}>
                {favorites.some((fav) => fav.id === cat.id)
                  ? "❤️ Quitar Me Gusta"
                  : "🤍 Me Gusta"}
              </Button>
              {cart.some((item) => item.id === cat.id) ? (
                <Button danger onClick={() => removeFromCart(cat.id)}>
                  ❌ Quitar del carrito
                </Button>
              ) : (
                <Button onClick={() => addToCart(cat)}>🛒 Adoptar</Button>
              )}
            </Card>
          ))}
        </Grid>
      )}

      {/* Controles de paginación */}
      <Pagination>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ⬅ Anterior
        </Button>
        <span>Página {currentPage}</span>
        <Button
          disabled={indexOfLastCat >= filteredCats.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente ➡
        </Button>
      </Pagination>
    </div>
  );
};

export default Home;
