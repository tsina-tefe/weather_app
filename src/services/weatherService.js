const BASE_URL = "http://localhost:3000/api/weather";

export const weatherService = {
  async getWeatherByCity(city) {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};
