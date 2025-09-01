import * as React from "react"

export default function CountryInfo() {
  const [countryCode, setCountryCode] = React.useState("AU")
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  let ignore

  const fetchData = async (country) => {
    const url = `https://restcountries.com/v2/alpha/${country}`
    if (ignore) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const result = await response.json()
      setIsLoading(false)
      setData(result)
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }
  const handleChange = (e) => {
    const countryCode = e.target.value
    setCountryCode(countryCode)
  }

  React.useEffect(() => {
    fetchData(countryCode)
    return () => {
      ignore = true
    }
  }, [countryCode])
  return (
    <section>
      <header>
        <h1>Country Info:</h1>

        <label htmlFor="country">Select a country:</label>
        <div>
          <select id="country" value={countryCode} onChange={handleChange}>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="MX">Mexico</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States of America</option>
          </select>
          {isLoading && <span>Loading...</span>}
          {error && <span>{error.message}</span>}
        </div>
      </header>

      {data && (
        <article>
          <h2>{data.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Capital:</td>
                <td>{data.capital}</td>
              </tr>
              <tr>
                <td>Region:</td>
                <td>{data.region}</td>
              </tr>
              <tr>
                <td>Population:</td>
                <td>{data.population}</td>
              </tr>
              <tr>
                <td>Area:</td>
                <td>{data.area}</td>
              </tr>
            </tbody>
          </table>
        </article>
      )}
    </section>
  )
}
