import { PatientToAdd, Gender } from './types';


type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, ssn: unknown, occupation: unknown };

const parsePatient = ({ name, dateOfBirth, gender, ssn, occupation }: Fields): PatientToAdd => {
  const patientToAdd: PatientToAdd = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseString(ssn, 'ssn'),
    occupation: parseString(occupation, 'occupation'),
  };

  return patientToAdd;
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

export default parsePatient;