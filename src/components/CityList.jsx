import { useCities } from "../contexts/Citycontext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";

function CityList() {
  const { cities } = useCities();
  return !cities.length ? (
    <Message message={"Add your first destination from the Map"} />
  ) : (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
