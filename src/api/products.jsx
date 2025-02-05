import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1/breeds";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de la API:", error);
    return [];
  }
};
