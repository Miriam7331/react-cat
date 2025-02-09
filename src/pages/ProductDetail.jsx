import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/products";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [cat, setCat] = useState(location.state?.cat || null);

  useEffect(() => {
    if (!cat) {
      const getCatDetails = async () => {
        const data = await fetchProductById(id);
        setCat(data);
      };
      getCatDetails();
    }
  }, [cat, id]);

  if (!cat) {
    return <p style={{ textAlign: "center", color: "gray" }}>Cargando detalles...</p>;
  }

  return (
    <Container>
      <h1>{cat.name}</h1>
      {cat.image && <Image src={cat.image} alt={cat.name} />}
      <p><strong>Origen:</strong> {cat.origin}</p>
      <p><strong>Temperamento:</strong> {cat.temperament}</p>
      <p><strong>Descripción:</strong> {cat.description}</p>
      <Button onClick={() => navigate(-1)}>⬅ Volver Atrás</Button>
    </Container>
  );
};

export default ProductDetail;
