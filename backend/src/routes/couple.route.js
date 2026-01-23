import {Router} from 'express';
import { createWedding } from '../controllers/couple.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/wedding/create-wedding").post(verifyJWT,createWedding);

export default router;