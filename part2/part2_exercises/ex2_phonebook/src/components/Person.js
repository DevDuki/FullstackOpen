
const Person = ({person, clickHandler}) => {
  return (
    <div>
      <p>{person.name} {person.phone}</p>
      <button onClick={() => clickHandler(person.id)}>delete</button>
    </div>
  )
}

export default Person