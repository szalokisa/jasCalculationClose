import { StoredProcedure } from '@selesterkft/sel-db';
import { db, initiateDbConnection } from '../dbConnection';

export async function EComm_LOCALSYSTEM_KEY_GET() {
    const storedProcedure = new StoredProcedure('EComm_LOCALSYSTEM_KEY_GET')

    storedProcedure.addOutputParam('OUT_LOCALSYSTEM_KEY', 'NVarChar', '', { length: 'max' });

    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    await initiateDbConnection();
    const sqlResult = await db.callSP(storedProcedure);
    
    return {
        localsystem_key: sqlResult.output.OUT_LOCALSYSTEM_KEY,
    };
}
