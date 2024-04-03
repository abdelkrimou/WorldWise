import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../contexts/Citycontext";
import styles from "./City.module.css";
import Button from "./Button";
import { useEffect } from "react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { currentCity, getCity } = useCities();
  console.log(currentCity);
  const { id } = useParams();
  const { cityName, emoji, date, notes } = currentCity;
  const navigate = useNavigate();
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{cityName}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" handleClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
