import { Gender, NewPatientEntry, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isSsn = (ssn: string): boolean => {
  const cleanedSsn = ssn.replace(/\D/g, '');
  return /^(\d{6}).*$/.test(cleanedSsn);
};

const isEntry = (entry: unknown): entry is Entry => {
  if (typeof entry !== 'object' || entry === null) {
    return false;
  }

  const { type } = entry as { type: unknown };

  return (
    typeof type === 'string' &&
    (type === 'Hospital' ||
     type === 'OccupationalHealthcare' ||
     type === 'HealthCheck')
  );
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missin ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }
  if (!Array.isArray(entries)) {
    throw new Error('Entries must be an array');
  }

  const parsedEntries: Entry[] = entries.map((entry: unknown) => {
    if (!isEntry(entry)) {
      throw new Error('Invalid entry: ' + JSON.stringify(entry));
    }
    return entry;
  });

  return parsedEntries;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {

    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: a field missing');
};


export default toNewPatientEntry;