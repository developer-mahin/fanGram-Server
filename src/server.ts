/* eslint-disable no-console */
import app from './app';
import { Server } from 'http';
import config from './app/config';
import mongoose from 'mongoose';
import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string).then(() => {
      console.log('database connected successfully');
    });
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`server running on port http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`👹 unhandledRejection is detected, shuting down....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`👹 uncaughtException is detected, shuting down....`);
  process.exit(1);
});
