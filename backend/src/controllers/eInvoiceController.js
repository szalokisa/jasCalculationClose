//import { eInvoiceService } from '../services';

export const eInvoiceController = {
    async handleNewInvoice(req, res, next) {
        let result;

        try {
            result = {
                result: 'eInvoiceController.handleInvoice'
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
        /*
                const user = {
                    portalOwnersId: props.user.portalOwnersId,
                    localSystemId: props.user.localSystemId,
                    name: props.user.name,
                    email: props.user.email.toLowerCase().trim(),
                    userLevel: props.user.userLevel,
                    language: props.user.language,
                };
        
                try {
                    result = await userService.register(req.headers);
                    res.status(200).json(result);
                } catch (error) {
                    next(error);
                }
        */
    },
}
