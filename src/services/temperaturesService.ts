import { Request } from 'express';

type GetTemperatureProp = {
  req: Request;
  location?: string;
}

export const getTemperature = async({req, location}: GetTemperatureProp): Promise<unknown> => {
  let temperaturesUrl = `${req.protocol}://${req.headers.host}/temperatures`;

  if (location) {
    const queryParams = new URLSearchParams({ location }).toString();
    temperaturesUrl += `?${queryParams}`;
  }

  const response = await fetch(temperaturesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();

  return data;
}