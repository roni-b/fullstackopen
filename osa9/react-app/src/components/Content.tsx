import Part from "./Part";

interface CourseProps {
  parts: PartFormat[];
}

interface PartFormat {
  name: string;
  exerciseCount: number;
  kind: string;
  description?: string;
  backgroundMaterial?: string;
  groupProjectCount?: number;
  requirements?: string[];
}


const Content = (props: CourseProps) => {
  return (
    <div>
      <Part parts={props.parts}/>
    </div>
  )
}

export default Content