import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAll, createEntry } from "./services/diaries";
import Entries from "./components/Entries";
import AddNew from "./components/AddNew";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const entryCreation = async (entry: NewDiaryEntry) => {
    try {
      const response = await createEntry(entry);
      setDiaries(diaries.concat(response));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }
  };

  return (
    <div>
      <Entries diaries={diaries}/>
      <AddNew addEntry={entryCreation}/>
      {error}
    </div>
  );
};

export default App;