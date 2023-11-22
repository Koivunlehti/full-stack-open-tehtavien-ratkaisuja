

const Persons = (props) => {

    const handleClick = (name, id) => {
        if(window.confirm("Delete " + name + "?")) {
            props.handleDelete(id)
        }
    }

    return (
        <>
            {props.persons.filter(person => person.name.match(new RegExp(props.filter,"i"))).map(person => 
            <p key={person.name}>{person.name} {person.number} 
                <button onClick={() => handleClick(person.name, person.id)}>Poista</button>
            </p>
            )}         
        </>
    )
}

export default Persons