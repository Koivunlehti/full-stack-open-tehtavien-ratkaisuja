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
  // Käytetään reducessa alkuarvona 0, jotta alkuarvoksi ei päädy oliota.
  const total = props.course.parts.reduce((total, part) => {
    total += part.exercises 
    return total
  }, 0)

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
