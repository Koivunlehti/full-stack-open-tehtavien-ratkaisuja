

const Filter = (props) => {
    return (
        <>
            filter shown with <input value={props.filter} onChange={props.handleFilterChange} />
        </>
    )
}

export default Filter