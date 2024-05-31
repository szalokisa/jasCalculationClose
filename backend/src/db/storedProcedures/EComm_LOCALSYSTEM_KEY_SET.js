import { StoredProcedure } from '@selesterkft/sel-db';
import { db, initiateDbConnection } from '../dbConnection';

export async function EComm_LOCALSYSTEM_KEY_SET(queryParams) {
    const storedProcedure = new StoredProcedure('EComm_LOCALSYSTEM_KEY_SET')

    storedProcedure.addParam('LOCALSYSTEM_KEY_OLD', 'NVarChar', queryParams.localsystem_key, { length: 'max' });
    storedProcedure.addParam('LOCALSYSTEM_KEY_NEW', 'NVarChar', queryParams.newKey, { length: 'max' });

    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    await initiateDbConnection();
    const dbResult = await db.callSP(storedProcedure);
    
    if (dbResult.output.OUT_HTTP_Code !== 200) {
        const err = new Error(dbResult.output.OUT_HTTP_Message);
        err.status = dbResult.output.OUT_HTTP_Code;
        throw(err);
    }
    return {};
}
