import { PatientToAdd, Gender, EntryWithoutId, HealthCheckRating } from './types';


type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, ssn: unknown, occupation: unknown };

const parsePatient = ({ name, dateOfBirth, gender, ssn, occupation }: Fields): PatientToAdd => {
  const patientToAdd: PatientToAdd = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseString(ssn, 'ssn'),
    occupation: parseString(occupation, 'occupation'),
    entries: []
  };

  return patientToAdd;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntry = (entry: any, type: string): EntryWithoutId => {
  if(type === 'HealthCheck') return parseHealthCheckEntry(entry);
  if(type === 'Hospital') return parseHospitalEntry(entry);
  return parseOccupationalEntry(entry);
};

type BaseEntryFields = { description: unknown, date: unknown, specialist: unknown };

interface HospitalEntryFields extends BaseEntryFields { type: 'Hospital' }

const parseHospitalEntry = ({ type, description, date, specialist }: HospitalEntryFields): EntryWithoutId => {
  const entryToAdd: EntryWithoutId = {
    type,
    description: parseString(description, 'description'),
    date: parseDate(date),
    specialist: parseString(specialist, 'specialist')
  };

  return entryToAdd;
};

interface OccupationalEntryFields extends BaseEntryFields { type: 'OccupationalHealthcare', employerName: unknown }

const parseOccupationalEntry = ({ type, description, date, specialist, employerName }: OccupationalEntryFields): EntryWithoutId => {
  const entryToAdd: EntryWithoutId = {
    type,
    description: parseString(description, 'description'),
    date: parseDate(date),
    specialist: parseString(specialist, 'specialist'),
    employerName: parseString(employerName, 'employerName')
  };
  return entryToAdd;
};

interface HealthCheckEntryFields extends BaseEntryFields { type: 'HealthCheck', healthCheckRating: unknown }

const parseHealthCheckEntry = ({ type, description, date, specialist, healthCheckRating }: HealthCheckEntryFields): EntryWithoutId => {
  const entryToAdd: EntryWithoutId = {
    type,
    description: parseString(description, 'description'),
    date: parseDate(date),
    specialist: parseString(specialist, 'specialist'),
    healthCheckRating: parseHealtchCheckRating(healthCheckRating),
  };

  return entryToAdd;
};



const parseHealtchCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
    throw new Error(`Incorrect or missing healthcheck rating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseString = (str: unknown, propName: string): string => {
  if(!str || !isString(str)){
    throw new Error(`Incorrect or missing ${propName}: ${str}`);
  }
  return str;
};


const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export {
  parsePatient,
  parseEntry
};