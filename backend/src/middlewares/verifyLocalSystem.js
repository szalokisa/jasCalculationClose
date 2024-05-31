import {EComm_LOCALSYSTEM_KEY_GET} from '../db/storedProcedures/EComm_LOCALSYSTEM_KEY_GET';

export async function verifyLocalSystem(req, res, next) {
  try {
    const localsystem_key = (await EComm_LOCALSYSTEM_KEY_GET()).localsystem_key;
    if (localsystem_key !== req.headers.localsystem_key) {
        throw new Error('Forbidden');
    }
    req.localsystem_key = localsystem_key;

    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
}
