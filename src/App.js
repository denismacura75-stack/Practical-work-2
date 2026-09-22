import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import data from "./data";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setTours(data);
        setLoading(false);
        return;
      }
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      console.log("Помилка завантаження:", error);
      setTours(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    const restTour = tours.filter((tour) => tour.id !== id);
    setTours(restTour);
  };

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
