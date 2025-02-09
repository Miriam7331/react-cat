import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1/breeds";
const IMAGE_SEARCH_URL = "https://api.thecatapi.com/v1/images/search";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const breeds = response.data;

    // Obtener imágenes para cada raza
    const breedsWithImages = await Promise.all(
      breeds.map(async (breed) => {
        const imageResponse = await axios.get(IMAGE_SEARCH_URL, {
          params: { breed_id: breed.id },
          headers: {
            "Content-Type": "application/json",
          },
        });
        const image = imageResponse.data[0]?.url;
        return { ...breed, image };
      })
    );

    return breedsWithImages;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}`);
    const breed = response.data.find((b) => b.id === id);

    if (!breed) {
      return null;
    }

    // Obtener imagen para la raza
    const imageResponse = await axios.get(IMAGE_SEARCH_URL, {
      params: { breed_id: id },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const image = imageResponse.data[0]?.url;
    return { ...breed, image };
  } catch (error) {
    console.error("Error al obtener los detalles del gato:", error);
    return null;
  }
};
