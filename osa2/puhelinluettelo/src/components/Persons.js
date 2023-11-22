

const Persons = (props) => {
    return (
        <>
            {props.persons.filter(person => person.name.match(new RegExp(props.filter,"i"))).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons