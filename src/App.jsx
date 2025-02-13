import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [queryCity, setQueryCity] = useState("bhopal");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=98586cda696a4c43a7d45859241809&q=${queryCity}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError("City not found");
          setData(null);
        } else {
          setData(res);
          setError("");
        }
      })
      .catch((err) => {
        setError("Something went wrong, please try again later.");
        setData(null);
        console.log(err.message);
      });
  }, [queryCity]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-300">
      <div className="sm:w-[70%] w-full sm:h-[90vh] h-full sm:shadow-lg sm:rounded-3xl rounded-none sm:p-10 p-3 bg-white">
        <h1 className="text-center text-2xl text-gray-800 font-bold">
          Weather App
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full sm:w-[70%]">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="sm:w-[80%] w-full py-2 sm:px-10 px-2 bg-gray-200 outline-none sm:rounded-l-full text-xl"
              placeholder="Enter City Name . . . ."
            />
            <button
              onClick={() => setQueryCity(city)}
              className="bg-gray-600 text-white sm:w-[20%] w-full sm:py-2 py-1 mt-4 sm:rounded-r-full text-xl"
            >
              Search
            </button>
          </div>
        </div>
        {error && (
          <h1 className="h-72 text-6xl text-red-500 mt-5 flex items-center justify-center">
            {error}
          </h1>
        )}
        {data && (
          <>
            <h3 className="sm:text-xl text-lg py-4 text-center">
              City Name: <span className="font-bold">{data.location.name}</span>{" "}
              [{data.location.region}]
            </h3>
            <div className="flex items-end justify-around mb-10">
              <h1 className="sm:text-8xl text-5xl">{data.current.temp_c}°C</h1>
              <div className="hidden sm:block w-24 h-24 bg-white rounded-full">
                <img
                  className="w-full h-full p-4"
                  src="weather-app.png"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row mt-10 gap-5">
              <div className="sm:w-1/3 w-full py-4 sm:border-r-4 sm:border-gray-500">
                <h1 className="text-2xl font-semibold text-center text-gray-500 ">
                  Condition
                </h1>
                <div className="sm:h-32 flex justify-center mt-6 items-center">
                  <img src={data.current.condition.icon} alt="" />
                  <h3 className="text-2xl py-2 font-bold">
                    {data.current.condition.text}
                  </h3>
                </div>
              </div>
              <div className="sm:w-1/3 w-full sm:py-4 py-1 sm:border-r-4 sm:border-gray-500">
                <h1 className="text-2xl font-semibold text-center text-gray-500 ">
                  Humidity
                </h1>
                <h2 className="sm:text-4xl text-2xl text-center font-bold mt-10">
                  {data.current.humidity} %
                </h2>
              </div>
              <div className="sm:w-1/3 w-full py-4">
                <h1 className="text-2xl font-semibold text-center text-gray-500 ">
                  Wind Speed
                </h1>
                <h2 className="sm:text-4xl text-2xl text-center font-bold mt-10">
                  {data.current.wind_kph} kph
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
