import { ipWhiteList } from '../../ipWhiteList'

export async function verifyIp(req, res, next) {
    /*
        if (!ipWhiteList.has(req.ip)) {
            const err = new Error(`IP is forbidden (${req.ip})`);
            err.httpCode = 403;
            next(err);
        }
*/

    next();
}
