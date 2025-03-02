/* eslint-disable no-console */
import { Server } from 'http';
import server from './server';
import { PORT } from './defaults';

export function startServer(server: Server, PORT: number) {
  try {
    server.listen(PORT, () => {
      console.log(`ReCart Service is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Failed to start server", e);
  }
}

startServer(server, PORT);
