import { useEffect, useState } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const ShowWeather = ({weatherData}) => {
    if (weatherData) {
        const data = weatherData
        const capital = data[0]?.name
        const temperature = data[0]?.main?.temp
        const icon = data[0]?.weather[0]?.icon
        const wind = data[0]?.wind?.speed
        const iconLink = `https://openweathermap.org/img/wn/${icon}.png`
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <div>temperature {temperature} Celsius</div>
                <img src={iconLink} width={80} alt={'weather icon'}></img>
                <div>wind {wind} m/s</div>
            </div>
        )
    }
}

const ShowResults = ({results, error, showOne, handleClick}) => {

    if (showOne) {
        const result = results.filter(r => r.name.common === showOne)
        const languages = result.map(r => Object.values(r.languages))
        const flag = result[0]?.flags?.png
        const capital = result[0]?.capital
        const country = result[0]?.name?.common
        
        return (
            <div>
                <h1>{country}</h1>
                <div>capital {capital}</div>
                <div>area {result.map(r => r.area)}</div>
                <h3>languages</h3>
                <ul>
                    {languages[0].map(l => <li key={l}>{l}</li>)}
                </ul>
                <img src={flag} width={200} alt={`flag of ${country}`}/>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }
    if (results.length > 1) {
        return (
            <div>
                {results.map(r => <div key={r.name.common}>{r.name.common}<button onClick={() => {handleClick(r.name.common)}}>show</button></div>)}
            </div>
        )
    }
}

const App = () => {
    const [newValue, setNewValue] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState(null)
    const [showOne, setShowOne] = useState(null)
    const [weatherData, setWeather] = useState(null)

    const handleInput = (event) => {
        setShowOne(null)
        setWeather(null)
        setNewValue(event.target.value)
        setResults([])
    }

    const handleClick = (e) => {
        setShowOne(e)
    }

    useEffect(() => {
        if (newValue) {
            axios
            .get(`https://restcountries.com/v3.1/all`)
            .then(response => {
                const search = response.data.filter(one => one.name.common.match(new RegExp(newValue, "i")))
                if (search.length === 1) {
                    setShowOne(search[0]?.name?.common)
                    const latlng = search.map(r => Object.values(r.capitalInfo))
                    const lat = latlng[0][0][0]
                    const lon = latlng[0][0][1]
                    axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
                    .then(response => {
                        setWeather([response.data])
                    })

                }
                if (search.length > 10) {
                    setError('Too many matches, specify another filter')
                }
                else {
                    setResults(search)
                    setError(null)
                }
            })
        }

    }, [newValue])

    return (
        <div>
            find countries <input
            value={newValue}
            onChange={handleInput}/>
            <ShowResults results={results} error={error} showOne={showOne} weatherData={weatherData} handleClick={handleClick}/>
            <ShowWeather weatherData={weatherData}/>
        </div>
    )
}

export default App