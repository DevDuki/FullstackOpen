import express from 'express';
import patientService from '../services/patientService';
import parsePatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientsData());
});

router.post('/', (req, res) => {
  try {
    const patientToAdd = parsePatient(req.body);

    const addedPatient = patientService.addPatient(patientToAdd);
    res.json(addedPatient);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;