import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const allPatients = (): NonSensitivePatient[] => {
  return patients;
};

const addNewPatient = ( patient: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientById = ( patientId: string ): Patient | undefined => {
  const find = patientData.find(p => p.id === patientId);
  return find;
};

export default {
  allPatients,
  addNewPatient,
  getPatientById
};