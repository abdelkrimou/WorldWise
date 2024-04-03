import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  loading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "fetchcities":
      return { ...state, cities: action.payload };
    case "fetchcurrentcity":
      return { ...state, currentCity: action.payload };
    case "addnewcity":
      return { ...state, cities: action.payload };
    case "load":
      return { ...state, loading: true };
    case "stoploading":
      return { ...state, loading: false };
    case "deletecity":
      return { ...state, cities: action.payload };
    default:
      throw new Error("action type is unknown");
  }
}
function Citiescontext({ children }) {
  const [{ cities, currentCity, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    const fetchCitiesList = async function () {
      try {
        const response = await fetch("http://localhost:8000/cities");
        if (!response.ok) throw new Error("Failed to fetch data of cities");
        const data = await response.json();
        dispatch({ type: "fetchcities", payload: data });
      } catch (error) {
        console.error(error.message);
      } finally {
        console.log("Fetch Finished");
      }
    };
    fetchCitiesList();
  }, []);

  const getCity = useCallback(function (id) {
    const fetchCurrentCity = async function () {
      try {
        const response = await fetch(`http://localhost:8000/cities/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data of cities");
        const data = await response.json();
        dispatch({ type: "fetchcurrentcity", payload: data });
      } catch (error) {
        console.error(error.message);
      } finally {
        console.log("Fetch current city Finished");
      }
    };
    fetchCurrentCity();
  }, []);
  async function createNewCity(newCity) {
    try {
      dispatch({ type: "load" });
      const response = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "applications/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch data of cities");
      const data = await response.json();
      dispatch({ type: "addnewcity", payload: [...cities, data] });
    } catch (error) {
      console.error(error.message);
    } finally {
      console.log("Fetch current city Finished");
      dispatch({ type: "stoploading" });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "load" });
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "deletecity",
        payload: cities.filter((city) => city.id !== id),
      });
    } catch {
      alert("problem with deleting data");
    } finally {
      console.log("Fetch current city Finished");
      dispatch({ type: "stoploading" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCity,
        loading,
        deleteCity,
        createNewCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("This useContext is used outside of its Provider tag");
  return value;
}

export { Citiescontext, useCities };
