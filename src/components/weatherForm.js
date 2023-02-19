import { useState } from 'react';
import styles from './weatherForm.module.css'

export default function WeatherForm({ onChangeCity }) {

    const [city, setCity] = useState('');
    const [error, setError] = useState(false)
    function handleOnChange(e) {
        const value = e.target.value;
        setCity(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if ([city].includes('')) {
            setError(true);
            return
        }

        setError(false);

        onChangeCity(city);
    }

    return <form onSubmit={handleSubmit} className={styles.container}>
        <input type="text" onChange={handleOnChange} className={styles.input} placeholder="Ingresa una ciudad ej: Santiago" />
        {error ? <small>Debe ingresar una ciudad</small> : null}
    </form>

}