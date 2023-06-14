import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = patientService.allPatients();
  res.send(entries);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const getPerson = patientService.getPatientById(id);

    if (getPerson) {
      res.json(getPerson);
    } else {
      res.status(404).send('Person not found');
    }
  } catch (error: unknown) {
    let errorMessage = 'Error: Person not found';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default router;