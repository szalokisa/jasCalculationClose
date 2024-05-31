import { query } from 'express';
import {
    EComm_LOCALSYSTEM_KEY_SET,
    EComm_LOCALSYSTEM_LOGIN,
    EComm_LOCALSYSTEM_USER_BY_TERMINALID_GET
} from '../db/storedProcedures';
import { localSystemToken as generateToken } from '../repository/token/localSystemToken';

export const localsystemService = {
    async LOCALSYSTEM_KEY_set(queryParams) {
        await EComm_LOCALSYSTEM_KEY_SET(queryParams);
        return {};
    },

    async getToken(queryParams) {
        await EComm_LOCALSYSTEM_USER_BY_TERMINALID_GET(queryParams.terminalId); //Checking terminalId
        return generateToken.get(queryParams);
    },
    async login(queryParams) {
        const terminalInfo = await EComm_LOCALSYSTEM_LOGIN(queryParams);
        return generateToken.get({
            type: 'LOCALSYSTEM',
            terminalId: terminalInfo.terminalId,
            ip: queryParams.ip,
        });
    },
}
