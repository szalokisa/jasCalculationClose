import CustomerportalService from './CustomerportalService';
import { emailTemplates } from '../repository/email/emailTemplates';
import Email from '../repository/email/Email';

export const userService = {
    async register(queryParams) {

        let dbResult;

        dbResult = await User.register(user);

        const email = new Email(dbResult);
        const result = await email.sendRegistrationEmail();

        return result;
    },

    async getUserById(userId) {
        return await CustomerportalService.getData({
            headers: {
                'x-collection': 'USERS',
                'x-filter': `ID = ${userId}`,
            }
        });
    },

    async sendInvitation(userId) {
        const user = (await this.getUserById(userId)).data.data[0];
        if (!user) {
            const err = new Error('MESSAGE_USER_NOT_FOUND');
            err.status = 400;
            throw err;
        }
        const email = await emailTemplates.registration(user);

        const result = await Email.send(email);

        return result;
    }
}
