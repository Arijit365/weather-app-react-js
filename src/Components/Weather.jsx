import React , {useEffect, useState , useRef} from 'react';
import './WeatherStyle.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';


export default function Weather({props}) {

  const inputRef = useRef();
  

  const allIcons = {
    "50d" : drizzle_icon,
    "01d" : clear_icon,
    "04d" : cloud_icon,
    "10d" : rain_icon,
    "13d" : snow_icon,
    "09d" :rain_icon,
  }

  const [weatherData , setWeatherData] = useState(false);

  const search = async(city)=>{
    try {
      const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': `8f881b0dbfmsh5909b90c9f74f56p1e56b8jsn9cc3bf294f44`,
    'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
  const icon = allIcons[result.weather.icon] || clear_icon;
  setWeatherData({
    humidity : result.main.humidity,
    windSpeed : result.wind.speed,
    temp: Math.floor(result.main.temp),
    city:result.name,
    icon: icon
  })
} catch (error){
	console.error(error);
}
    } catch (error) {
      
    }
  }

  useEffect(()=>{
search("New York")
  }, []);
  
  return (
    <div className='weather'>
<div className='search-bar'>
    <input type='text' placeholder='Search'/>
    <img src={search_icon} alt=""  />
</div>
<img src={weatherData.icon} alt="" className='weather-icon' />
<p className='temperature'> {weatherData.temp} &deg; C </p>
<p className='location'>  {weatherData.city} </p>
<div className='weather-data'>
  <div className='col'>
    <img src={humidity_icon} alt="" />
    <div>
      <p> {weatherData.humidity} % </p>
      <span> Humidity </span>
    </div>
  </div>
  <div className='col'>
    <img src={wind_icon} alt="" />
    <div>
      <p> {weatherData.windSpeed} </p>
      <span> Wind Speed </span>
    </div>
  </div>
</div>
    </div>
  )
}
