import React, { useMemo } from 'react'
import "./WeatherCard.css"

const WeatherCard = ({ weather }) => {
    if (!weather) return null

    const { name, main, weather: weatherInfo } = weather
    const { temp, humidity } = main || {}
    const { description, icon } = (weatherInfo && weatherInfo[0]) || {}

    console.log(name, temp, humidity, description, icon)

    const iconUrl = useMemo(() => {
        return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''
    }, [icon])

    return (
        <div className='card'>
            <h2>{name}</h2>
            <div className="img-wrap">
                {iconUrl && <img src={iconUrl} alt="아이콘" />}
            </div>
            <p>{description}</p>
            <p>
                {temp !== undefined ? Math.round(temp) : ''}°C
            </p>
            <p>
                {humidity}%
            </p>
        </div>
    )
}

export default WeatherCard