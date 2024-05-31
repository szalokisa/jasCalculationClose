import { localSystemToken } from '../repository/token/localSystemToken';
import { EComm_LOCALSYSTEM_USER_BY_TERMINALID_GET } from '../db/storedProcedures';

export async function verifyLocalsystemToken(req, res, next) {
  try {
    const extractedToken = localSystemToken.verify(req.headers['x-token'] || req.headers.token);
    if (extractedToken.type !== 'LOCALSYSTEM') {
      throw new Error('Forbidden');
    }

    //Checking terminalId
    await EComm_LOCALSYSTEM_USER_BY_TERMINALID_GET(extractedToken.terminalId);

    req['x-tokenExtracted'] = extractedToken;

    next();

  } catch (e) {
    e.status = 403;
    next(e);
  }
}
