import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalle del Producto {id}</h1>
    </div>
  );
};

export default ProductDetail;
