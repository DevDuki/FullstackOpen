import patientsData from '../../data/patients';
import { NonSensitivePatient, Patient, PatientToAdd } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientsData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patientToAdd: PatientToAdd): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientToAdd
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient
};