import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/products";

const Home = () => {
    const [cats, setCats] = useState([]);
  
    useEffect(() => {
      const getCats = async () => {
        const data = await fetchProducts();
        setCats(data);
      };
      getCats();
    }, []);
  
    return (
      <div>
        <h1>Lista de Razas de Gatos</h1>
        {cats.length === 0 ? (
          <p>Cargando razas...</p>
        ) : (
          cats.map((cat) => (
            <div key={cat.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <h3>{cat.name}</h3>
              <p><strong>Origen:</strong> {cat.origin}</p>
              <p><strong>Temperamento:</strong> {cat.temperament}</p>
              {cat.image && cat.image.url ? (
                <img src={cat.image.url} alt={cat.name} width="200px" />
              ) : (
                <p>Imagen no disponible</p>
              )}
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default Home;