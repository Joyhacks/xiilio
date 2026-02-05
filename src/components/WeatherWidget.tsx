import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Loader2 } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

interface WeatherWidgetProps {
  compact?: boolean;
}

const getWeatherIcon = (condition: string, compact: boolean = false) => {
  const iconClass = compact ? "w-5 h-5" : "w-5 h-5";
  switch (condition.toLowerCase()) {
    case "clear":
    case "sunny":
      return <Sun className={`${iconClass} text-yellow-400`} />;
    case "rain":
    case "drizzle":
      return <CloudRain className={`${iconClass} text-blue-400`} />;
    case "snow":
      return <CloudSnow className={`${iconClass} text-blue-200`} />;
    case "thunderstorm":
      return <CloudLightning className={`${iconClass} text-purple-400`} />;
    case "windy":
      return <Wind className={`${iconClass} text-gray-400`} />;
    default:
      return <Cloud className={`${iconClass} text-gray-400`} />;
  }
};

const getConditionFromCode = (code: number): string => {
  if (code === 0) return "clear";
  if (code >= 1 && code <= 3) return "cloudy";
  if (code >= 45 && code <= 48) return "foggy";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "cloudy";
};

// Default coordinates based on timezone region
const getDefaultCoordsFromTimezone = (timezone: string): { lat: number; lon: number } => {
  const region = timezone.split('/')[0];
  switch (region) {
    case 'America':
      return { lat: 40.7128, lon: -74.0060 }; // New York
    case 'Europe':
      return { lat: 51.5074, lon: -0.1278 }; // London
    case 'Asia':
      return { lat: 35.6762, lon: 139.6503 }; // Tokyo
    case 'Australia':
      return { lat: -33.8688, lon: 151.2093 }; // Sydney
    case 'Africa':
      return { lat: -33.9249, lon: 18.4241 }; // Cape Town
    default:
      return { lat: 51.5074, lon: -0.1278 }; // Default to London
  }
};

export function WeatherWidget({ compact = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherWithCoords = async (latitude: number, longitude: number, city: string) => {
      try {
        // Fetch weather from Open-Meteo (free, no API key needed, CORS-friendly)
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const weatherData = await weatherResponse.json();
        
        const temp = Math.round(weatherData.current.temperature_2m);
        const conditionCode = weatherData.current.weather_code;
        
        setWeather({
          temperature: temp,
          condition: getConditionFromCode(conditionCode),
          location: city,
        });
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
        setLoading(false);
      }
    };

    const getLocationAndWeather = () => {
      // Try browser geolocation first
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Get city name from timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const city = timezone.split('/').pop()?.replace(/_/g, ' ') || 'Local';
            await fetchWeatherWithCoords(latitude, longitude, city);
          },
          async () => {
            // Fallback: Use timezone-based default location
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const city = timezone.split('/').pop()?.replace(/_/g, ' ') || 'Local';
            // Default to a central location based on common timezones
            const defaultCoords = getDefaultCoordsFromTimezone(timezone);
            await fetchWeatherWithCoords(defaultCoords.lat, defaultCoords.lon, city);
          },
          { timeout: 5000, maximumAge: 300000 }
        );
      } else {
        // No geolocation, use timezone-based fallback
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const city = timezone.split('/').pop()?.replace(/_/g, ' ') || 'Local';
        const defaultCoords = getDefaultCoordsFromTimezone(timezone);
        fetchWeatherWithCoords(defaultCoords.lat, defaultCoords.lon, city);
      }
    };

    getLocationAndWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(getLocationAndWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return null; // Silently hide on error
  }

  if (loading) {
    return (
      <div className={`flex items-center gap-1.5 ${compact ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-md bg-primary/10 border border-primary/20`}>
        <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
        <span className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>...</span>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
        {getWeatherIcon(weather.condition)}
        <span className="text-xs font-medium text-foreground tabular-nums">
          {weather.temperature}°C
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20">
      {getWeatherIcon(weather.condition)}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground tabular-nums leading-tight">
          {weather.temperature}°C
        </span>
        <span className="text-[10px] text-muted-foreground leading-tight truncate max-w-[60px]">
          {weather.location}
        </span>
      </div>
    </div>
  );
}
