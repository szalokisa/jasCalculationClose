import { userService } from '../services';
import CustomerportalService from '../services/CustomerportalService';

export const customerportalController = {
    async deleteById(req, res, next) {
        try {
            await CustomerportalService.deleteById(
                {
                    collection: req.headers["x-collection"],
                    id: req.headers["x-id"],
                });
            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    },

    async deleteUserByPartnerId(req, res, next) {
        try {
            await CustomerportalService.deleteUserByPartnerId(req.headers['x-partnerid']);
            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    },

    async getData(req, res, next) {
        let result;

        try {
            result = await CustomerportalService.getData(req);
            res.status(200).json(result.data);
        } catch (error) {
            console.error(error)
            next(error);
        }
    },

    async upsertRecords(req, res, next) {
        let result;
        try {
            result = await CustomerportalService.upsertRecords(
                {
                    collection: req.body.collection,
                    data: req.body.data,
                });

            res.status(200).json(result.data);
        } catch (error) {
            next(error);
        }
    },

    async sendInvitation(req, res, next) {
        let result;
        try {
            const result = await userService.sendInvitation(req.headers['x-userid']);

            res.status(200).json(result)
            return
        } catch (error) {
            next(error);
        }
    },
}
