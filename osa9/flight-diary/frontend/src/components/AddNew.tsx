import { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";

interface AddEntryProps {
  addEntry: (entry: NewDiaryEntry) => void;
}

const AddNew = (props: AddEntryProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>({} as Weather);
  const [visibility, setVisibility] = useState<Visibility>({} as Visibility);
  const [comment, setComment] = useState('');


  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.addEntry({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    });
    setDate('');
    setWeather({} as Weather);
    setVisibility({} as Visibility);
    setComment('');
  };

  const weatherOptions = Object.values(Weather).map((value) => (
    <option key={value} value={value}>{value}</option>
  ));

  const visibilityOptions = Object.values(Visibility).map((value) => (
    <option key={value} value={value}>{value}</option>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        date <input type="date" onChange={(event) => setDate(event.target.value)} /><br/>
        visibility
        <select value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}>
          {visibilityOptions}
        </select><br/>
        weather
        <select value={weather} onChange={(event) => setWeather(event.target.value as Weather)}>
          {weatherOptions}
        </select><br/>
        comment <input type="text" onChange={(event) => setComment(event.target.value)}/><br/>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddNew;