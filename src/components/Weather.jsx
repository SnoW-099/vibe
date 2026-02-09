import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind } from 'lucide-react';

function Weather() {
    const [weather, setWeather] = useState({ temp: '--', icon: 'sun', loading: true });

    useEffect(() => {
        // Default location (e.g., Madrid) just in case
        let lat = 40.4168;
        let lon = -3.7038;

        const fetchWeather = async (latitude, longitude) => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m&timezone=auto`
                );
                const data = await response.json();

                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code;

                let icon = 'sun';
                if (code >= 1 && code <= 3) icon = 'cloud';
                else if (code >= 51 && code <= 67) icon = 'rain';
                else if (code >= 71 && code <= 77) icon = 'snow';
                else if (code >= 95 && code <= 99) icon = 'storm';

                setWeather({ temp, icon, loading: false });
            } catch (error) {
                console.error('Weather error:', error);
                setWeather(prev => ({ ...prev, loading: false }));
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    fetchWeather(lat, lon); // Fallback if denied
                }
            );
        } else {
            fetchWeather(lat, lon);
        }
    }, []);

    const getIcon = () => {
        switch (weather.icon) {
            case 'cloud': return <Cloud size={20} />;
            case 'rain': return <CloudRain size={20} />;
            case 'snow': return <CloudSnow size={20} />;
            case 'storm': return <CloudLightning size={20} />;
            default: return <Sun size={20} />;
        }
    };

    return (
        <div className="weather-widget" title="Current Weather">
            {weather.loading ? (
                <div className="weather-spinner"></div>
            ) : (
                <>
                    <span className="weather-icon">{getIcon()}</span>
                    <span className="weather-temp">{weather.temp}°</span>
                </>
            )}
        </div>
    );
}

export default Weather;
