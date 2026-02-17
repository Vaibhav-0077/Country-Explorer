// import { useEffect, useState } from "react"
import { useState } from "react";
import { CountryCards } from "./CountryCards"
import { useQuery } from "@tanstack/react-query";


export const CountryData = () => {

  const [search , setSearch] = useState("")


  const countryDetails =
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,cca2";

  const countryState =
    "https://countriesnow.space/api/v0.1/countries";

  const fetchCountries = async () => {
    const [res1, res2] = await Promise.all([
      fetch(countryDetails),
      fetch(countryState),
    ]);

    const countries = await res1.json();
    const statesData = await res2.json();

    const mergedData = countries.map((country) => {
      const match = statesData.data.find(
        (c) => c.iso2 === country.cca2
      );

      return {
        ...country,
        states: match ? match.cities : [],
      };
    });

    return mergedData;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  


  //SEARCH FUNCTIONALITY
  const searchData = (data || []).filter((curCountry) =>
    curCountry.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  // Loading state
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Error state
  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div>
      <div className="pokemon-search">
        <input type="text" placeholder="Search Country" value={search} onChange={(e)=> setSearch(e.target.value)}/>
      </div>
      <ul className="cards">
        {/* {data.map((curElem) => ( */}
        {searchData.map((curElem) => (
          <CountryCards
            key={curElem.name.common}
            curElem={curElem}
          />
        ))}
      </ul>
    </div>
  );
};
