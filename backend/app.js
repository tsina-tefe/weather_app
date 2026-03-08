import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express, { json } from "express";
import cors from "cors";
const app = express();
const apiKey = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT;

app.use(cors());
app.use(json());

app.post("/api/weather", async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ message: "Please enter location" });
  }

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );

    if (!response.ok && response.status !== 400)
      throw new Error("Something went wrong, Please try again later");

    const data = await response.json();

    if (data.error) throw new Error("No matching location found");

    return res.status(200).json({
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      date: data.current.last_updated,
      city: `${data.location.name}, ${data.location.country}`,
    });
  } catch (error) {
    console.log("Error message: ", error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
