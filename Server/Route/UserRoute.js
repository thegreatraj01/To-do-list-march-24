import express from 'express';
import { signup ,fake } from '../Controlar/UserControllar.js';
const router = express.Router(); 


router.post('/signup', signup);

router.get('/',fake)



export default router;