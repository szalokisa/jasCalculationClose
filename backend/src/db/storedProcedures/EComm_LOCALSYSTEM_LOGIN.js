import { StoredProcedure } from '@selesterkft/sel-db';
import { db, initiateDbConnection } from '../dbConnection';

export async function EComm_LOCALSYSTEM_LOGIN(queryParams) {
    const storedProcedure = new StoredProcedure('EComm_LOCALSYSTEM_LOGIN')

    storedProcedure.addParam('Localsystem_Terminal', 'NVarChar', queryParams.terminal, { length: 10 })
    storedProcedure.addParam('Localsystem_Login', 'NVarChar', queryParams.login, { length: 5 })
    storedProcedure.addParam('Localsystem_Pass', 'NVarChar', queryParams.password, { length: 50 })

    storedProcedure.addOutputParam('OUT_TerminalId', 'Int');
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

    return {
        userInfo: JSON.parse(dbResult.output.OUT_UserInfo),
        terminalId: dbResult.output.OUT_TerminalId,
    };
}
