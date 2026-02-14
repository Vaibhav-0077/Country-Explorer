import { Link } from "react-router-dom"

export const CountryCards = ({curElem , onSelect}) =>{  

    // console.log(curElem.states)
    

    return(
        <li className="pokemon-card">
            <figure>
                <img src={curElem.flags.svg} alt={curElem.flags.alt || "flag"} className="pokemon-image"/>
            </figure>
            <h1 className="pokemon_h1">{curElem.name.common}</h1>
            <div>
                <p className="pokemon-info">
                    <span> Capital : </span> {curElem.capital ? curElem.capital[0] : "N/A"}
                </p>

                <p className="pokemon-info">
                    <span> Country Code : </span> {curElem.cca2}
                </p>

                <p className="pokemon-info">
                    <span> Population : </span> {curElem.population}
                </p>
            </div>

            <Link to={`/country/${curElem.cca2}`}>
                <button className="country-details-btn">See Full Detail</button>
            </Link>
        </li>        
    )
}