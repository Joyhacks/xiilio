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

const getWeatherIcon = (condition: string) => {
  const iconClass = "w-4 h-4";
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

export function WeatherWidget({ compact = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location via IP geolocation (no permission needed)
        const geoResponse = await fetch("https://ipapi.co/json/");
        const geoData = await geoResponse.json();
        
        const { latitude, longitude, city } = geoData;
        
        // Fetch weather from Open-Meteo (free, no API key needed)
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const weatherData = await weatherResponse.json();
        
        const temp = Math.round(weatherData.current.temperature_2m);
        const conditionCode = weatherData.current.weather_code;
        
        setWeather({
          temperature: temp,
          condition: getConditionFromCode(conditionCode),
          location: city || "Unknown",
        });
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
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
