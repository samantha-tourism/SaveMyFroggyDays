import React from "react";
import { useState, useEffect, useRef } from "react";
import CardContainer from "./CardContainer";
import APIKEY from "./ApiKeyTourism";

import "./Result.css";
const limit = 1;
const radius = 1000; // in meters

const Result = (props) => {
  const [arrayActivities, setArrayActivities] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [rain, setRain] = useState(props.rain);
  const inter = useRef(null);
  const clear = () => {
    window.clearInterval(inter.current);
  };

  useEffect(() => {
    async function request(props, offset) {
      let arrayAct = [];
      const coordsCity = await fetch(
        `http://api.opentripmap.com/0.1/en/places/geoname?apikey=${APIKEY}&name=${props.city}`,
      ).then((res) => res.json());
      if (coordsCity.hasOwnProperty("error")) arrayAct = "404";
      else {
        const { lat, lon } = coordsCity;
        clear();

        if (city !== props.city || rain !== props.rain) {
          // when the user makes a new research, reset
          setOffset(0);
          setCity(props.city);
          setRain(props.rain);
          setArrayActivities([]);
        }

        // can't forEach when using async funcions
        let i = 0;
        inter.current = setInterval(async function () {
          const listActivities = await fetch(
            `https://api.opentripmap.com/0.1/en/places/radius?apikey=${APIKEY}&radius=${radius}&limit=${limit}&offset=${offset}&lon=${lon}&lat=${lat}&rate=1&format=json`,
          ).then((res) => res.json());
          if (!listActivities[i] || listActivities.length === 0) {
            clear();
            return;
          }
          const activitiesData = await fetch(
            `https://api.opentripmap.com/0.1/en/places/xid/${listActivities[i].xid}?apikey=${APIKEY}`,
          ).then((res) => res.json());
          if (
            activitiesData.kinds &&
            !(
              activitiesData.kinds.includes("accomodation") ||
              activitiesData.kinds.includes("unclassified_objects") ||
              activitiesData.kinds.includes("banks") ||
              activitiesData.kinds.includes("transport") ||
              activitiesData.kinds.includes("industrial")
            ) &&
            (!props.rain ||
              !(
                activitiesData.kinds.includes("natural") ||
                activitiesData.kinds.includes("historic") ||
                activitiesData.kinds.includes("architecture") ||
                activitiesData.kinds.includes("urban_environment")
              )) &&
            (props.checkedAdult || !activitiesData.kinds.includes("adult")) &&
            (props.checkedRelig ||
              !activitiesData.kinds.includes("religion")) &&
            (props.checkedRest || !activitiesData.kinds.includes("foods")) &&
            (props.checkedSport || !activitiesData.kinds.includes("sport")) &&
            (props.checkedShop || !activitiesData.kinds.includes("shops"))
          ) {
            arrayAct.push(activitiesData);
          }

          i++;
          setOffset(offset + 1);
          setArrayActivities([...arrayActivities, ...arrayAct]);
          setLoading(false);
          setLoading(true);
        }, 1000);
      }
    }
    if (props.city === "404") return;
    const fetchData = async () => {
      await request(props, offset);
    };
    fetchData();
  }, [arrayActivities, props]);

  useEffect(() => {}, [loading]);

  return (
    <div className="searchAndResult">
      <div className="result">
        {props.city ? (
          props.city === "404" ? (
            <h2 id="error404">
              Sorry we did not find any city with that name 🐸
            </h2>
          ) : (
            <>
              <CardContainer arrayActivities={arrayActivities} />
            </>
          )
        ) : null}
      </div>
    </div>
  );
};
export default Result;
