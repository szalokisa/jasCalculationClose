import { StoredProcedure } from '@selesterkft/sel-db';
import { db, initiateDbConnection } from '../dbConnection';

export async function EComm_LOCALSYSTEM_USER_BY_TERMINALID_GET(terminalId) {
    const storedProcedure = new StoredProcedure('EComm_LOCALSYSTEM_USER_BY_TERMINALID_GET')

    storedProcedure.addParam('TerminalId', 'Int', terminalId);
    storedProcedure.addOutputParam('OUT_UserInfo', 'NVarChar', '', { length: 'max' });

    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    await initiateDbConnection();

    const dbResult = await db.callSP(storedProcedure);

    if (dbResult.output.OUT_HTTP_Code !== 200) {
        const err = new Error(dbResult.output.OUT_HTTP_Message);
        err.status = dbResult.output.OUT_HTTP_Code;
        throw (err);
    }

    return JSON.parse(dbResult.output.OUT_UserInfo);
}
