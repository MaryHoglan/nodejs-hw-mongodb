import { setupServer } from './server.js';
import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';





async function main() {
  try {
    await initMongoConnection(); 
    setupServer();               
  } catch (error) {
    console.error('Failed to start app:', error.message);
    process.exit(1);
  }
}

main();