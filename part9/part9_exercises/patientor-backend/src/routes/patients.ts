import express from 'express';
import patientService from '../services/patientService';
import { parsePatient, parseEntry } from '../utils';

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

router.get('/:id', (req, res) => {
  const patient = patientService.getById(req.params.id);
  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getById(req.params.id);
    const entryToAdd = parseEntry(req.body, req.body.type);

    if(!patient) throw new Error('Patient could not be found');

    const editedPatient = patientService.addEntryToPatient(patient, entryToAdd);

    res.json(editedPatient);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }

});

export default router;