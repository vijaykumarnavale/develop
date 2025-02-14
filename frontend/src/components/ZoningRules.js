import React, { useState, useEffect } from "react";
import "./ZoningRules.css";

const ZoningRules = () => {
  const [zoneCodes, setZoneCodes] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/zones")
      .then(response => response.json())
      .then(data => {
        const uniqueZoneCodes = [...new Set(data.map(item => item.zone_code))];
        setZoneCodes(uniqueZoneCodes);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching zone codes:", error);
        setError("Failed to load zone codes.");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!selectedZone) {
      setError("Please select a zone code.");
      return;
    }
    setLoading(true);
    setError("");
    
    fetch(`http://localhost:5000/zones/${selectedZone}`)
      .then(response => response.json())
      .then(data => {
        setFilteredData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching zone data:", error);
        setError("Failed to fetch zoning data.");
        setLoading(false);
      });
  };

  const handleViewDetails = (zoneId) => {
    setLoading(true);
    setError("");
    
    fetch(`http://localhost:5000/zone/${zoneId}`)
      .then(response => response.json())
      .then(data => {
        setViewData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching zone details:", error);
        setError("Failed to fetch zone details.");
        setLoading(false);
      });
  };

  return (
    <div className="zone-container">
      <h2 className="zone-title">Zoning Rules</h2>
      {error && <p className="error-message">{error}</p>}

      <label htmlFor="zone-select" className="zone-label">
        Select Zone Code:
      </label>
      <select
        id="zone-select"
        className="zone-select"
        value={selectedZone}
        onChange={(e) => setSelectedZone(e.target.value)}
        aria-label="Select a zoning code"
      >
        <option value="">--Select--</option>
        {zoneCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className="zone-button" disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>

      {loading && <p className="loading-message">Loading data...</p>}

      {filteredData.length > 0 && (
        <ZoningTable data={filteredData} onViewDetails={handleViewDetails} />
      )}

      {viewData && <ZoneDetails data={viewData} onClose={() => setViewData(null)} />}
    </div>
  );
};

const ZoningTable = ({ data, onViewDetails }) => (
  <table className="zone-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Zone Code</th>
        <th>Use Name</th>
        <th>Use Type</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.zone_code}</td>
          <td>{item.use_name}</td>
          <td>{item.use_type}</td>
          <td>
            <button
              className="view-button"
              onClick={() => onViewDetails(item.id)}
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ZoneDetails = ({ data, onClose }) => (
  <div className="popup-overlay">
    <div className="popup-box">
  
      <table className="popup-table">
        <tbody>
          {[
            "zone_code",
            "use_name",
            "use_type",
            "min_lot_size",
            "front_setback",
            "side_setback",
            "rear_setback",
            "max_height",
            "max_units",
            "required_parking_spaces",
            "parking_type",
            "parking_dimensions",
            "condition_type",
            "condition_description",
            "additional_notes",
          ].map((key) => (
            <tr key={key}>
              <td>
                <strong>{key.replace(/_/g, " ")}:</strong>
              </td>
              <td>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);

export default ZoningRules;
