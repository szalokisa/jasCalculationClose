import logger from '@selesterkft/express-logger';
import { DB } from '@selesterkft/sel-db';
import { sleep } from '../repository/sleep';

export const sqlConfig = {
  server: process.env.DB_SERVER,
  options: {
    database: process.env.DB_DATABASE,
    encrypt: (process.env.DB_ENCRYPT === 'true'),
    trustServerCertificate: true,
    requestTimeout: (process.env.DB_TIMEOUT) ? parseInt(process.env.DB_TIMEOUT) : 120000,
    cancelTimeout: 120000,
    rowCollectionOnDone: true,
    //port: (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 1433,
    instanceName: process.env.DB_INSTANCE,
  },
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  },
}

export const db = new DB(logger);

export async function initiateDbConnection() {
  if (db.getState() === 'LoggedIn') {
    return;
  }

  await db.initiateConnection(sqlConfig);
  while ( db.getState() !== 'LoggedIn' ) {
    console.log(' waiting for a free connection', Math.random());
    await sleep(1000);
  }
}
