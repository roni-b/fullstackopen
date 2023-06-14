import { useParams } from "react-router-dom";
import { Patient, Diagnosis, Entry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const fieldStyle = {
  padding: "5px",
  borderRadius: "5px",
  border: "solid",
};

const HealthHeartColor: React.FC<{ rating: number }> = ({ rating }) => {
  let heartColor: string;

  if (rating === 0) {
    heartColor = 'green';
  } else if (rating === 1) {
    heartColor = 'yellow';
  } else if (rating === 2) {
    heartColor = 'orange';
  } else {
    heartColor = 'red';
  }

  const favoriteIconStyle = {
    color: heartColor,
  };

  return <FavoriteIcon style={favoriteIconStyle} />;
}

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== 'Hospital') {
    throw new Error('Invalid entry type');
  }
  return (
    <div style={fieldStyle}>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <i>{entry.description}</i>
    </div>
  )
};

const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== 'OccupationalHealthcare') {
    throw new Error('Invalid entry type');
  };
  return (
    <div style={fieldStyle}>
      <p>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></p>
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
};

const HealthCheck: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== 'HealthCheck') {
    throw new Error('Invalid entry type');
  }
  return (
    <div style={fieldStyle}>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <i>{entry.description}</i>
      <br/>
      <HealthHeartColor rating={entry.healthCheckRating}/>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />
    case "HealthCheck":
      return <HealthCheck entry={entry} />
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: Entry): never => {
  throw new Error(
    'no match'
  );
};

interface Props {
  patients: Patient[]
  diagnoses: Diagnosis[]
}

const PatientPage = ({ patients, diagnoses } : Props ) => {
  const id = useParams().id
  const patient = patients.find(p => p.id === id)
  if (!patient) {
    return (
      <div>
        <p>patient not found</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>gender: {patient.gender}<br/>ssh: {patient.ssn}<br/>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((entry, index) => (
      <div key={index}>
        <EntryDetails entry={entry}/>
        <ul>
        {entry.diagnosisCodes?.map((code, index) => {
          const diagnosis = diagnoses.find(d => d.code === code);
          if (diagnosis) {
            return <li key={index}>{diagnosis.code} {diagnosis.name}</li>;
          }
          return null;
        })}
        </ul>
      </div>
      ))}
    </div>
  )
}

export default PatientPage