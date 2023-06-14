import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = diagnoseService.allDiagnoses();
  res.send(entries);
});

export default router;