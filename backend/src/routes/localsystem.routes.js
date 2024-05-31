import express from 'express';
import { localsystemController } from '../controllers';

const cors = require('cors');

import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';
import { verifyIp } from '../middlewares/verifyIp';
const router = express.Router();
router.use(cors());
router.use(express.json());
router.use(verifyLocalSystem);

router.get('/token', localsystemController.getToken);
router.use(verifyIp);
router.get('/login', localsystemController.login);
router.put('/key', localsystemController.LOCALSYSTEM_KEY_set);

export default router;
