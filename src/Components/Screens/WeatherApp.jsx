import React, { useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

function WeatherApp() {
    const [input, setInput] = useState("");
    const [weather, setWeather] = useState({ loading: false, data: {}, error: false });

    const search = async () => {
        setWeather({ ...weather, loading: true });
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
        try {
            const response = await axios.get(url, {
                params: {
                    q: input,
                    units: 'metric',
                    appId: api_key,
                },
            });
            setWeather({ data: response.data, loading: false, error: false });
        } 
        catch (error) {
            setWeather({ ...weather, data: {}, error: true });
            console.log(error);
        }
    };

    const handleSearchIconClick = () => {
        if (input) {
            search();
            setInput('');
        }
    };

    const toDateFunction = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;

        return date;
    };

    return (
        <>
            <section className="weather-app">
                <div className="wrapper">
                    <h1 className="app-name">Weather Application</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            className="city-search"
                            placeholder="Enter The City"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {if (e.key === 'Enter') {search()}}}
                        />
                        <img
                            src={require('../../Assets/Images/search.png')}
                            alt="searchicon"
                            className="searchlogo"
                            onClick={handleSearchIconClick}
                        />
                    </div>
                    <span className="loader">
                        {weather.loading && (
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#8ff460', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        )}
                    </span>
                    <span className="error-message">
                        {weather.error && (
                            <>
                                <FontAwesomeIcon icon={faFrown} className="icon-error" />
                                <span>City not found</span>
                            </>
                        )}
                    </span>
                    {weather && weather.data && weather.data.main && (
                        <>
                            <div className="city-name">
                                <h2>
                                    {weather.data.name},<span>{weather.data.sys.country}</span>
                                </h2>
                            </div>
                            <div className="date">
                                <span>{toDateFunction()}</span>
                            </div>
                            <div className="icon-temp">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                    alt={weather.data.weather[0].description}
                                />
                                <h4 className="temperature">{Math.round(weather.data.main.temp)}°C</h4>
                            </div>
                            <div className="des-wind">
                                <p>{weather.data.weather[0].description}</p>
                                <p>Wind Speed - {weather.data.wind.speed} M/S</p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default WeatherApp;
