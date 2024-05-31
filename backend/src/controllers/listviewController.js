import { listviewService } from '../services';

export const listviewController = {
    async getData(req, res, next) {
        let result;
        try {
            result = await listviewService.getData(
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
            result = await listviewService.upsertRecords(
                req.verified,
                {
                    collection: req.body.collection,
                    data: req.body.data,
                });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
}
