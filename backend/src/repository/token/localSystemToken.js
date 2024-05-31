import { sign, verify } from 'jsonwebtoken';

export const localSystemToken = {
  get(params) {
    switch (params.type) {
      case 'LOCALSYSTEM':
        return sign(
          {
            portalOwnersId: process.env.PORTAL_OWNERS_ID,
            terminalId: params.terminalId,
            ip: params.ip,
            type: params.type,
          },
          process.env.JWT_KEY
        );

      default:
        throw new Error('Unknown token type');
    }
  },

  verify(token) {
    const extractedToken = verify(token, process.env.JWT_KEY);
    const currentDate = new Date();

    if (extractedToken.valid < currentDate.getTime()) {
      const err = new Error('invalid token');
      err.status = 403;
      throw err;
    }

    return extractedToken;
  }
}
