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
        <h2>{props.course.name}</h2>
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

  export default Course