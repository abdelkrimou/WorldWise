import { useCities } from "../contexts/Citycontext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";

function CityList() {
  const { cities } = useCities();

  const countries = cities.reduce((acc, curr) => {
    if (!acc.some((item) => item.country === curr.country)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  console.log(countries);

  return !countries.length ? (
    <Message message={"Add your first destination from the Map"} />
  ) : (
    <ul className={styles.countryList}>
      {countries.map((filteredcity) => (
        <CountryItem country={filteredcity} key={filteredcity.id} />
      ))}
    </ul>
  );
}

export default CityList;
