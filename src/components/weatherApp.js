import { useState, useEffect } from 'react';
import WeatherForm from './weatherForm';
import WeatherMainInfo from './WeatherMainInfo';
import styles from './weatherApp.module.css';
import Loading from './Loading';

export default function WeatherApp() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ""}`;
    }, [weather])

    async function loadInfo(city = 'Santiago') {
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}&Key=${process.env.REACT_APP_KEY}&q=${city}`);

            const json = await request.json();

            if (json.error) {
                setError(true)
                return
            }
            setError(false)
            setTimeout(() => {
                setWeather(json);
            }, 2000)

        } catch (err) {
            console.log(err)
        }
    }

    function handleChangeCity(city) {
        setWeather(null);
        loadInfo(city);
    }

    return <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleChangeCity} />
        {

            error ? <h3>Ciudad { } no encontrada</h3> :
                weather ? <WeatherMainInfo weather={weather} /> : <Loading />
        }

    </div>;

}