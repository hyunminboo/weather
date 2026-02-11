import WeatherCard from './components/WeatherCard'
import './App.css'
import { useState, useRef, useEffect, useMemo } from 'react'
import { fetchCoordinates } from './api/geo'
import { fetchWeatherByCoords } from './api/weather'
import { getBgImageByWeatherId } from './data/bgcolor'

function App() {
  const [city, setCity] = useState('seoul')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const bg = useMemo(() => {
    const weatherId = weather?.weather?.[0]?.id || 0
    return getBgImageByWeatherId(weatherId)
  }, [weather])

  const handleSearch = async () => {
    const q = city.trim()
    if (!q) return

    try {
      setLoading(true)
      setErr('')
      const { lat, lon } = await fetchCoordinates(q)
      const data = await fetchWeatherByCoords(lat, lon)
      setWeather(data)
      setCity('')
    } catch (error) {
      console.error(error)
      setErr(error.message || "알 수 없는 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const onChangeInput = (e) => setCity(e.target.value)
  const onKeyup = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container">
        <h1>부현민의 날씨앱</h1>
        <div className="input-wrap">
          <input
            value={city}
            onChange={onChangeInput}
            onKeyUp={onKeyup}
            ref={inputRef}
            type="text"
            placeholder='날씨를 입력하세요' />
          <button onClick={handleSearch}>검색</button>
        </div>
        {err && <p>{err}</p>}
        {loading && <p>로딩 중 ...</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  )
}

export default App