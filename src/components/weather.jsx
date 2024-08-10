
import React, { useEffect, useState } from "react";
import "./weather.css";

export function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: "kadapa",
        humidity: 10,
        speed: 2,
        image: ""
    });
    const [name, setName] = useState("kadapa");
   
    

    // Function to fetch weather data based on city name
    const fetchWeatherData = (city) => {
        const apiKey = '3ad780095a0c40848b755059240708'; // Your actual API key
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        fetch(apiUrl)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                console.log(data);
                let imagePath = "";

                // Use condition text to decide image URL
                const condition = data.current.condition.text.toLowerCase();
                
                if (condition.includes("sunny")) {
                    imagePath = "https://live.staticflickr.com/474/18029620944_77e01f9e73_b.jpg";
                } else if (condition.includes("cloudy")) {
                    imagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVvHSmKM8-hREnbc9qLFcgCNTiF5nDWVNGmA&s";
                } else if (condition.includes("rain")) {
                    imagePath = "https://www.shutterstock.com/image-photo/heavy-rain-tree-parking-260nw-721266523.jpg";
                } else if (condition.includes("drizzle")) {
                    imagePath = "https://www.shutterstock.com/image-photo/drizzle-on-windshield-evening-260nw-667415668.jpg";
                } else if (condition.includes("fog")) {
                    imagePath = "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/foggy-morning-in-a-meadow.jpg";
                } else {
                    imagePath = "https://live.staticflickr.com/474/18029620944_77e01f9e73_b.jpg"; // Default image
                }

                // Update state with the fetched data
                setData({
                    celcius: data.current.temp_c, // Temperature in Celsius
                    name: data.location.name, // City name
                    humidity: data.current.humidity, // Humidity
                    speed: data.current.wind_kph, // Wind speed in kilometers per hour
                    image: imagePath // Set the image URL
                });
            })
            .catch(error => {
                console.error('Error:', error); // Handle any errors
            });
    };

    useEffect(() => {
        fetchWeatherData(name); // Fetch data when the component mounts or city name changes
    }, [name]); // Dependency array includes cityName to trigger the effect on change

    const handleSearch = () => {
        if (name.trim() !== "") { // Ensure the name is not empty or just whitespace
            fetchWeatherData(name);
        }
    };

    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Enter city Name" 
                        value={name}
                        onChange={e => setName(e.target.value)} // Update city name state
                    />
                    <button className="bi bi-search" onClick={handleSearch}></button>
                </div>
                <div className="error">
                    <p></p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="Weather" style={{ width: "100px", height: "50px" }} />

                    <h2 className="mt-3">{Math.round(data.celcius)}°C</h2>
                    <h3 className="mt-0"></h3>

                    <div className="details">
                        <div className="col">
                            <img
                                src="https://i.pinimg.com/564x/e6/71/72/e67172f0e1e266098ae55b7f057c0761.jpg"
                                alt="Humidity"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <div className="humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className="col">
                            <img
                                src="/images/wind.jpeg"
                                alt="Wind"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <div className="wind">
                                <p>{Math.round(data.speed)} km/h</p>
                                <p style={{}}>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
