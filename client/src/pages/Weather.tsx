import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Loader2 } from "lucide-react";
import { Geolocation } from '@capacitor/geolocation';

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 1. Get Location
        const coordinates = await Geolocation.getCurrentPosition();
        const lat = coordinates.coords.latitude;
        const lon = coordinates.coords.longitude;

        // 2. Fetch Weather (Open-Meteo is Free & No Key needed)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const data = await response.json();
        setWeather(data);
      } catch (e) {
        setError("Could not get location or weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Helper to choose icon based on WMO code
  const getWeatherIcon = (code: number) => {
    if (code <= 1) return <Sun className="w-16 h-16 text-yellow-500" />;
    if (code <= 3) return <Cloud className="w-16 h-16 text-gray-400" />;
    return <CloudRain className="w-16 h-16 text-blue-400" />;
  };

  return (
    <Layout title="Local Weather">
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p>Detecting location...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-800 rounded-xl text-center">
            {error}
            <button onClick={() => window.location.reload()} className="block mx-auto mt-2 underline">Retry</button>
          </div>
        ) : (
          <>
            {/* Main Card */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 text-white shadow-lg text-center">
              <div className="flex justify-center mb-4">
                {getWeatherIcon(weather.current.weather_code)}
              </div>
              <h2 className="text-6xl font-bold mb-2">{weather.current.temperature_2m}°</h2>
              <p className="text-blue-100 text-lg flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Current Location
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
                <div>
                  <p className="text-xs text-blue-100 uppercase">Wind</p>
                  <p className="font-bold">{weather.current.wind_speed_10m} km/h</p>
                </div>
                <div>
                  <p className="text-xs text-blue-100 uppercase">Humidity</p>
                  <p className="font-bold">{weather.current.relative_humidity_2m}%</p>
                </div>
                <div>
                  <p className="text-xs text-blue-100 uppercase">Max/Min</p>
                  <p className="font-bold">
                    {weather.daily.temperature_2m_max[0]}° / {weather.daily.temperature_2m_min[0]}°
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}