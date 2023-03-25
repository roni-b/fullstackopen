const Course = (props) => {
  const { courses } = props

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map(cours => <p key={cours.id}> {cours.name} {cours.exercises}</p>)}
          <Total course={course}/>
        </div>
      )}
    </div>
  )
}

const Total = (props) => {
  const { course } = props
  return (
    <div>
      <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div>
  )
}

export default Course
