import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const allDiagnoses = () => {
  return diagnoses;
};

export default {
  allDiagnoses
};