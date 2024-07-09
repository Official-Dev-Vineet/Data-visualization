import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/data").then((response) => {
      setData(response.data);
    });
  }, []);

  const getUniqueOptions = (field) => {
    return [...new Set(data.map((item) => item[field]).filter(Boolean))];
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.end_year ? item.end_year == filters.end_year : true) &&
      (filters.topic.toLowerCase()
        ? item.topic.toLowerCase() == filters.topic.toLowerCase()
        : true) &&
      (filters.sector.toLowerCase()
        ? item.sector.toLowerCase() == filters.sector.toLowerCase()
        : true) &&
      (filters.region.toLowerCase()
        ? item.region.toLowerCase() == filters.region.toLowerCase()
        : true) &&
      (filters.pestle.toLowerCase()
        ? item.pestle.toLowerCase() == filters.pestle.toLowerCase()
        : true) &&
      (filters.source.toLowerCase()
        ? item.source.toLowerCase() == filters.source.toLowerCase()
        : true) &&
      (filters.country.toLowerCase()
        ? item.country.toLowerCase() == filters.country.toLowerCase()
        : true)
    );
  });

  const chartData = {
    labels: filteredData.map((item) => item.title),
    datasets: [
      {
        label: "Intensity",
        data: filteredData.map((item) => item.intensity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Likelihood",
        data: filteredData.map((item) => item.likelihood),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Relevance",
        data: filteredData.map((item) => item.relevance),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Energy Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        <label>End Year:</label>
        <select
          onChange={(e) => setFilters({ ...filters, end_year: e.target.value })}
          value={filters.end_year}
        >
          <option value="">All</option>
          {getUniqueOptions("end_year").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>Topic:</label>
        <select
          onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
          value={filters.topic}
        >
          <option value="">All</option>
          {getUniqueOptions("topic").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>Sector:</label>
        <select
          onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
          value={filters.sector}
        >
          <option value="">All</option>
          {getUniqueOptions("sector").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>Region:</label>
        <select
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          value={filters.region}
        >
          <option value="">All</option>
          {getUniqueOptions("region").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>PESTLE:</label>
        <select
          onChange={(e) => setFilters({ ...filters, pestle: e.target.value })}
          value={filters.pestle}
        >
          <option value="">All</option>
          {getUniqueOptions("pestle").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>Source:</label>
        <select
          onChange={(e) => setFilters({ ...filters, source: e.target.value })}
          value={filters.source}
        >
          <option value="">All</option>
          {getUniqueOptions("source").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label>Country:</label>
        <select
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          value={filters.country}
        >
          <option value="">All</option>
          {getUniqueOptions("country").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="chartArea" style={{ overflow: "auto" }}>
        <Bar data={chartData} />
      </div>
    </main>
  );
};

export default Dashboard;
