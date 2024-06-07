import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';
import { query } from 'express';

export default async function SYS_GRID_DATA_UPSERT(verified, queryParams) {
    const storedProcedure = new StoredProcedure('SYS_GRID_DATA_UPSERT')
    storedProcedure.addParam('SYS_GRID_Code', 'NVarChar', queryParams.collection, { length: 128 });
    storedProcedure.addParam('DATA', 'NVarChar', JSON.stringify(queryParams.data), { length: 'max' });
    storedProcedure.addParam('UserID', 'Int', 0);
    storedProcedure.addOutputParam('OUT_SAVED_DATA', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });
    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return {
        data: sqlResult.output.OUT_SAVED_DATA,
    };
}
