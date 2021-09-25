import patientsData from '../../data/patients';
import { NonSensitivePatient, Patient, PatientToAdd, EntryWithoutId, Entry } from '../types';
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
    occupation,
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

const getById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addEntryToPatient = (patient: Patient, entry: EntryWithoutId ): Patient => {
  const entryToAdd: Entry = { id: uuid(), ...entry };
  const editedPatient: Patient = {
    ...patient,
    entries: [
      entryToAdd,
    ]
  };
  return editedPatient;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient,
  getById,
  addEntryToPatient,
};