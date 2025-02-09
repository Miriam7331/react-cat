import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1/breeds";
const IMAGE_URL = "https://cdn2.thecatapi.com/images/";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const breeds = response.data.map((breed) => ({
      id: breed.id,
      name: breed.name,
      origin: breed.origin,
      temperament: breed.temperament,
      description: breed.description,
      image: breed.reference_image_id
        ? `${IMAGE_URL}${breed.reference_image_id}.jpg`
        : null,
    }));

    return breeds;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(API_URL);
    const breed = response.data.find((b) => b.id === id);

    if (!breed) {
      return null;
    }

    return {
      id: breed.id,
      name: breed.name,
      origin: breed.origin,
      temperament: breed.temperament,
      description: breed.description,
      image: breed.reference_image_id
        ? `${IMAGE_URL}${breed.reference_image_id}.jpg`
        : null,
    };
  } catch (error) {
    console.error("Error al obtener los detalles del gato:", error);
    return null;
  }
};
