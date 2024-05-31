import { localsystemService } from '../services';

export const localsystemController = {
    async LOCALSYSTEM_KEY_set(req, res, next) {
        let result;
        try {
            result = await localsystemService.LOCALSYSTEM_KEY_set({
                localsystem_key: req.localsystem_key,
                newKey: req.headers.newkey,
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async getToken(req, res, next) {
        try {
            const token = await localsystemService.getToken({
                type: 'LOCALSYSTEM',
                terminalId: req.headers.terminalid,
                ip: req.ip,
            });
            res.status(200).json({
                token,
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const token = await localsystemService.login({
                terminal: req.headers.terminal,
                login: req.headers.login,
                password: req.headers.password,
                ip: req.ip,
            })

            res.status(200).json({
                token,
            })
        } catch (error) {
            next(error);
        }
    },
}
