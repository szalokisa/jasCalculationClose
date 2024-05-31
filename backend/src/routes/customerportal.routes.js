import express from 'express';
import { customerportalController } from '../controllers';
import { verifyIp } from '../middlewares/verifyIp';
import { verifyLocalsystemToken } from '../middlewares/verifyToken';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyLocalsystemToken);
router.use(verifyIp);

router.post('/sendinvitation', customerportalController.sendInvitation);
router.get('/data', customerportalController.getData);
router.put('/data', customerportalController.upsertRecords);
router.delete('/data', customerportalController.deleteById);
router.delete('/users/partnerid', customerportalController.deleteUserByPartnerId);

export default router;
