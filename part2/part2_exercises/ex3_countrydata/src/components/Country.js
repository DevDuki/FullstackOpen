
const Country = ({country}) => {
    if(Object.keys(country).length > 0){
        return (
          <>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
              {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={`${country.name}'s flag`} width="250" height="150" />
          </>
        )
    } else {
        return null
    }
}

export default Country