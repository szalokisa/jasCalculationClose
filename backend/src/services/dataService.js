import {
    SYS_GRID_DATA_DELETE,
    SYS_GRID_DATA_GET,
    SYS_GRID_DATA_UPSERT
} from "../db/storedProcedures"

export const dataService = {
    async deleteById(verified, queryParams) {
        return await SYS_GRID_DATA_DELETE(verified, queryParams);
    },

    async getData(verified, queryParams) {
        if (verified.localSystemId) {
            const partnerWhere = `partnerId='${verified.localSystemId}'`;
            queryParams.where = queryParams.where
                ? `(${partnerWhere}) AND (${queryParams.where})`
                : partnerWhere;
        }
        return await SYS_GRID_DATA_GET(verified, queryParams);
    },

    async upsertRecords(verified, queryParams) {
        return await SYS_GRID_DATA_UPSERT(verified, queryParams);
    },
};
