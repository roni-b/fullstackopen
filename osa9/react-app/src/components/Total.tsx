interface TotalProps {
  parts: Part[];
}

interface Part {
  name: string;
  exerciseCount: number;
}


const Total = (props: TotalProps) => {
  return (
    <div>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

export default Total