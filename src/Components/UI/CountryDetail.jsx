import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const CountryDetail = () => {
  const { code } = useParams();

  // 1️⃣ Fetch country basic info
  const fetchCountry = async () => {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const data = await res.json();
    return data[0];
  };

  const { data: country, isLoading } = useQuery({
    queryKey: ["country", code],
    queryFn: fetchCountry,
  });


  // 2️⃣ Fetch cities AFTER country loads
  const fetchCities = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: country.name.common,
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    
    return data.data;
  };

  const { data: cities } = useQuery({
    queryKey: ["cities", country?.name.common],
    queryFn: fetchCities,
    enabled: !!country,   // 🔥 important
  });

  

  // 2️⃣ Fetch sates AFTER country loads
  const fetchStates = async () => {
  const stateRes = await fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country?.name?.common,
      }),
    }
  );

  const stateData = await stateRes.json();
  console.log("API Response:", stateData);

  return stateData.data?.states || [];
};


  const { data: states, isError} = useQuery({
    queryKey: ["states", country?.name.common],
    queryFn: fetchStates,
    enabled: !!country,   // 🔥 important
  });


  // 3️⃣ Fetch extra country details by name
  const fetchCountryByName = async () => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country?.name?.common}`
    );
    const data = await res.json();
    return data[0];
  };

  const { data: extraDetails } = useQuery({
    queryKey: ["countryByName", country?.name?.common],
    queryFn: fetchCountryByName,
    enabled: !!country,
  });




  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="country-detail-page">
      <div className="country-detail-card">
        
        <div className="country-top-section">
          <div className="country-flag">
            <img src={country.flags.svg} alt="flag" />
          </div>

          <div className="country-info">
            <h1>{country.name.common}</h1>
          </div>


          <div className="country-coatofarms">
            {extraDetails?.coatOfArms?.png ? (
              <>
                <img
                src={extraDetails.coatOfArms.png}
                alt="Coat of Arms"
                />
                <h1 className="coat-title">Coat of Arms</h1>
              </>
            ) : (
              <p>No Coat of Arms Available</p>
            )}
          </div>
        </div>

        <div className="country-info">
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong>Population:</strong> {country.population}</p>


            {/* //EXTRA DETAILS */}
            {extraDetails && (
              <div className="country-extra-details">
                <p><strong>Country Code:</strong> {extraDetails.cca2}</p>
                <p><strong>Region:</strong> {extraDetails.region}</p>
                <p><strong>Subregion:</strong> {extraDetails.subregion}</p>
                <p><strong>Timezones:</strong> {extraDetails.timezones?.join(", ")}</p>
                <p><strong>Currencies:</strong> {
                  extraDetails.currencies &&
                  Object.values(extraDetails.currencies)
                    .map((cur) => `${cur.name} (${cur.symbol})` )
                    .join(", ")
                    
                }</p>

              <p>
                <strong>Independent:</strong>{" "}
                {extraDetails?.independent ? "Yes" : "No"}
              </p>
                <p><strong>Languages:</strong> {
                  extraDetails.languages &&
                  Object.values(extraDetails.languages).join(", ")
                }</p>
              </div>
            )}
        </div>


        <div className="country-cities">
          <h3>States & State-Code</h3>
          <ul>
            {states?.map((state, index) => (
              <li key={index}>{state.name} ({state.state_code})</li> 
            ))}
          </ul>
        </div>


        <div className="country-cities">
          <h3>Cities</h3>
          <ul>
            {cities?.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>

  
      </div>
    </div>

  );
};
