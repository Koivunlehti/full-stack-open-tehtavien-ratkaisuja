const Course = (props) => {
  return (
    <div>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Total course={props.course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      {props.course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </>
  )
}

const Total = (props) => {
  let total = 0
  for (let i = 0; i < props.course.parts.length; i++) {
    total += props.course.parts[i].exercises
  } 
  return (
    <>
      <p><b>total of {total} exercises </b></p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
