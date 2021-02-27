import React, { useState, useEffect } from "react";
import "./Search.css";
import Img from "../Image/setting.png";
import apiKey from "./ApiKeyMeteo";
import Filter from "./Filter";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

const Search = (props) => {
  const [cityName, setCityName] = useState("");
  const [show, setShow] = useState(false);
  const [showwhen, setShowwhen] = useState(false);
  const [meteo, setMeteo] = useState([]);
  const [dropdown, setDropdown] = useState("Tomorrow");
  const [day, setDay] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const getCoordinates = (position) => {
    const city = fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`,
    )
      .then((res) => res.json())
      .then((res) => setCityName(res.name));
  };
  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const search = (evt) => {
    if (!cityName) return;
    //weatherbis
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`,
    )
      .then((res) => res.json())
      .then((result) => {
        setMeteo(result.list);
        props.passCity("");
        props.passCity(cityName);
      })
      .then((res) => {
        if (res) props.passCity(res.city.name);
      });
  };

  useEffect(() => {
    props.passCity("");
    props.passCity(cityName);
    if (meteo) props.passMeteoLater(
      meteo.find(
        (meteoInTime) =>
          meteoInTime.dt_txt.includes("12:00:00") &&
          dtToDate(meteoInTime.dt).includes(day),
      ),
    );
  }, [meteo, day]);

  let today = new Date();

  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let dayTwo = new Date();
  dayTwo.setDate(today.getDate() + 2);

  let dayThree = new Date();
  dayThree.setDate(today.getDate() + 3);

  let dayFour = new Date();
  dayFour.setDate(today.getDate() + 4);

  const localString = (date) => {
    return date.toLocaleDateString();
  };

  const dtToDate = (dt) => {
    return new Date(dt * 1000).toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showwhen) props.loadweather(e);
    else {
      search();
    }
  };

  const filters = [
    {
      checked: props.filterAdult,
      filterName: "Adult",
      filterPic: <AiIcons.AiFillHome />,
      passChecked: props.passFilterAdult,
    },
    {
      checked: props.filterRest,
      filterName: "Food",
      filterPic: <BiIcons.BiRestaurant />,
      passChecked: props.passFilterRest,
    },
    {
      checked: props.filterRelig,
      filterName: "Religion",
      filterPic: <BiIcons.BiChurch />,
      passChecked: props.passFilterRelig,
    },
    {
      checked: props.filterShop,
      filterName: "Shopping",
      filterPic: <AiIcons.AiFillShopping />,
      passChecked: props.passFilterShop,
    },
    {
      checked: props.filterSport,
      filterName: "Sport",
      filterPic: <BiIcons.BiRun />,
      passChecked: props.passFilterSport,
    },
  ];
  return (
    <div id="searchFunction" className={`i${props.icon}`}>
      <p className="discoverActivity">Discover Your Activity</p>
      <p className="descriptionDiscover">
        Even if the weather is bad, there is an activity for you!
      </p>

      <div>{props.error ? error() : null}</div>
      <form className="formInput" onSubmit={handleSubmit}>
        <div className="inputSearchBar">
          <div className="locationSearchBar">
            <input
              id="city"
              type="text"
              placeholder="City"
              value={cityName}
              onChange={handleChange}
            ></input>
          </div>

          <div className="when">
            {" "}
            <span className="letsGo">GO!</span>
            <p>Later</p>
            <input
              id="later"
              type="checkbox"
              onChange={() => {
                setShowwhen(!showwhen);
                props.toggleLater();
                search();
              }}
            />
             {showwhen ? (
          <div>
            <div>
              <div>
                <select
                  value={dropdown}
                  onChange={(e) => {
                    setDropdown(e.target.value);
                    setDay(e.target.value);
                  }}
                  className='dropdownLater'
                >
                  <option value={localString(tomorrow)}>Tomorrow</option>
                  <option value={localString(dayTwo)}>dans 2 jours</option>
                  <option value={localString(dayThree)}>dans 3 jours</option>
                  <option value={localString(dayFour)}>dans 4 jours</option>
                </select>
              </div>
            </div>
          </div>
        ) : null}
          </div>

          <div id="filterDescription">
            <p id="textFilter"> Categories</p>
            <img
              src={Img}
              alt="setting"
              id="setting"
              onClick={() => setShow(!show)}
            ></img>
          </div>
        </div>
        
        {show ? (
          <ul className= "filterContainer">
            {filters.map((f, i) => (
              <Filter
                key={f.filterName + i}
                checked={f.checked}
                filterName={f.filterName}
                filterPic={f.filterPic}
                passChecked={f.passChecked}
              />
            ))}
          </ul>
        ) : null}
        <button type="submit" id="send">
          {" "}
          Search
        </button>
        <div className="errorWeather">{props.error ? error() : null}</div>
      </form>
    </div>
  );
};

function error() {
  return "Please enter city! 🐸";
}

export default Search;
