import { query } from 'express';
import {
    SYS_GRID_DATA_GET
} from '../db/storedProcedures';

export const listviewService = {
    async getData(verified, queryParams) {
        return await SYS_GRID_DATA_GET(1, queryParams);
    },
}
