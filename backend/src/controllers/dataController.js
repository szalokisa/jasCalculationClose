import { dataService } from '../services';

export const dataController = {
    async deleteById(req, res, next) {
        try {
            await dataService.deleteById(
                req.verified,
                {
                    collection: req.headers["x-collection"],
                    id: req.headers["x-id"],
                });
            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    },

    async getData(req, res, next) {
        let result;
        try {
            result = await dataService.getData(
                req.verified, {
                gridCode: req.headers['x-collection'],
                limit: req.headers['x-limit'],
                where: req.headers['x-filter'],
                sort: req.headers['x-sort'],
                language: req.headers['x-language'],
                pageNo: req.headers['x-pageno'],
                rowsPerPage: req.headers['x-rowsperpage']
            });
            res.status(200).json(result);
        } catch (error) {
            console.error(error)
            next(error);
        }
    },

    async upsertRecords(req, res, next) {
        let result;
        try {
            result = await dataService.upsertRecords(
                req.verified,
                {
                    collection: req.body.collection,
                    data: req.body.selectedRows,
                });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
