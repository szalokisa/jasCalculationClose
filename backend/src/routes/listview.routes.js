import express from 'express';
import { listviewController } from '../controllers';

const cors = require('cors');

// import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';
import { verifyLocalsystemToken } from '../middlewares/verifyToken';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(verifyLocalsystemToken);

router.get('/data', listviewController.getData);
// router.put('/', dataController.upsertRecords);
// router.delete('/', dataController.deleteById);

export default router;
