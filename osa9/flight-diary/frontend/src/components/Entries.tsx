import { DiaryEntry } from "../types";

interface DiaryProps {
  diaries: DiaryEntry[];
}

const Entries = (props: DiaryProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaries.map(diary =>
        <div key={diary.id}><h3>{diary.date}</h3><p>visibility: {diary.visibility}</p><p>weather: {diary.weather}</p></div>
      )}
    </div>
  );
};

export default Entries;