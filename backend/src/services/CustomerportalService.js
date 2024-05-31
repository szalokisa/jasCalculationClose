import Customerportal from '../repository/Customerportal';

export default class CustomerportalService {
    static async deleteById(queryParams) {
        const customerportal = new Customerportal();
        return await customerportal.deleteById(queryParams);
    }

    static async deleteUserByPartnerId(partnerId) {
        const customerportal = new Customerportal();
        await customerportal.deleteByPartnerId(partnerId);
        return {};
    }

    static async getData(queryParams) {
        const customerportal = new Customerportal();
        return await customerportal.getData(queryParams);
    }

    static async upsertRecords(queryParams) {
        const customerportal = new Customerportal();
        return await customerportal.upsertRecords(queryParams);
    }

    static async getRegistrationToken(userId) {
        const customerportal = new Customerportal();
        return await customerportal.getRegistrationToken(userId);
    }
}
