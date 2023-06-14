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

const Part = (props: CourseProps) => {
  const assertNever = (value: PartFormat): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const check = props.parts.map((part, id) => {
    switch(part.kind) {
      case "basic":
        return `${part.name} ${part.exerciseCount}`;
      case "group":
        return <p key={id}><b>{part.name} {part.exerciseCount}</b>
          <br/>project exercises {part.groupProjectCount}
        </p>;
      case "background":
        return <p key={id}><b>{part.name} {part.exerciseCount}</b>
          <br/><i>{part.description}</i>
          <br/>submit to: {part.backgroundMaterial}
        </p>;
      case "description":
        return <p key={id}><b>{part.name} {part.exerciseCount}</b>
          <br/><i>{part.description}</i>
        </p>;
      case "special":
        return <p key={id}><b>{part.name} {part.exerciseCount}</b>
        <br/><i>{part.description}</i>
        <br/> required skills: {part.requirements?.join(", ")}
      </p>;
      default:
        return assertNever(part);

    }
  })

  return (
    <div>
      {check}
    </div>
  )
}

export default Part
