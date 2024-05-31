import { PING as sqlPing } from '../db/storedProcedures';

export const heartbeat = async (req, res) => {
  const result = {
    product: 'SELEXPED WEB backend',
    heartbeat: true,
    version: '2024.05.30-01',
    dbConnection: false,
  }
  try {
    await sqlPing();
    result.dbConnection = true
  } catch (error) {
    //Nothing to do
  }

  res.json(result);
};
