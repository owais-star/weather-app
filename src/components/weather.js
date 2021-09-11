import React, { useEffect, useState } from 'react';
import "./css/style.css";
import axios from 'axios';


function Myapp() {
    const [city, setCity] = useState(null)
    const [search, setSearch] = useState('karachi')

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
            .then(res => {
                const newWeather = res.data;
                console.log(newWeather);

                setCity(newWeather);
            });

    }, [search]);



    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month}, ${year}`
    }



    return (
        <main>
            <div className="input-box">
                <input type="search"
                    className="search"
                    placeholder="Search..."
                    onChange={(event) => {
                        setSearch(event.target.value)
                    }}
                    value={search}
                />
            </div>
            {
                !city ? (
                    <p> No Data Found </p>
                ) : (
                    <div>
                        <div className="info-box">
                            <h2 className="location">
                                <i className="fas fa-map-marker-alt"></i> {search}, {city.sys.country}
                            </h2>
                            <h2 className="date">{dateBuilder(new Date())}</h2>
                        </div>

                        <div className="weather-box">
                            <div className="temp">{Math.round(city.main.temp)}°c
                                <div className="temp1">Feels Like : {Math.round(city.main.feels_like)}°c</div>
                                <div className="temp1">Humidity : {Math.round(city.main.humidity)}%</div>
                                <div className="temp2">Max Temp {Math.round(city.main.temp_max)}°c | Min Temp {Math.round(city.main.temp_min)}°c</div>
                            </div>
                            <div className="weather">{city.weather[0].main}</div>
                        </div>
                    </div>
                )}

        </main>
    )
}

export default Myapp