// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import stylesbtn from "./button.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import { useCities } from "../contexts/Citycontext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createNewCity, loading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getLocation() {
        setError();
        try {
          const response =
            await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
        `);
          if (!response.ok)
            throw new Error("Problem with fetching the Location");

          const data = await response.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error(
              "This location doesn't match any country , please click somewhere else"
            );

          setCityName(data.city ? data.city : data.locality);
          setEmoji(convertToEmoji(data.countryCode));
          setCountry(data.countryName);
          console.log(data);
        } catch (error) {
          setError(error.message);
        } finally {
          console.log("get location fetching ended");
        }
      }
      getLocation();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createNewCity(newCity);
    navigate("/app");
  }

  if (error) return <Message message={error} />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button
          className={`${stylesbtn.btn} ${stylesbtn.primary}`}
          onClick={handleSubmit}
        >
          Add
        </button>
        <Button type="back" handleClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
