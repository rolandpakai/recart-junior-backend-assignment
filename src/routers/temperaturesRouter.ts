import { Router, Request, Response } from 'express';
import { WeatherSchema } from '../schemas/validationSchemas';

const router = Router();
const weatherAPIBaseUrl = 'http://api.weatherapi.com/v1/current.json';

router.get('/', async (req: Request, res: Response) => {
  if (!process.env.WEATHER_API_KEY) {
    res.status(500).json({ error: "Missing Weather API key" });
    return;
  }

  const location = (req.query?.location ? req.query.location : 'Budapest') as string;
  const params = new URLSearchParams();

  params.append('key', process.env.WEATHER_API_KEY);
  params.append('q', location);

  try {
    const apiResp = await fetch(`${weatherAPIBaseUrl}?${params.toString()}`)
    const weatherData: unknown = await apiResp.json();
    const validationResult = WeatherSchema.safeParse(weatherData);

    if (validationResult.success) {
      const typedWeatherData = validationResult.data;
      res.status(200).json({ location, temperature: typedWeatherData.current.temp_c });
    } else {
      console.error("Invalid weather data:", validationResult.error.errors);
      res.status(400).json({ error: "Invalid weather data" });
    }
  } catch (error: unknown) {
    res.status(500).json({ error });
  }
});

export default router;