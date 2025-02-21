import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/add-user"; // Replace with actual backend URL

const App = () => {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      // Ensure input is trimmed to remove extra spaces
      const trimmedInput = inputData.trim();

      // Attempt to parse JSON safely
      let parsedData;
      try {
        parsedData = JSON.parse(trimmedInput);
      } catch (err) {
        alert("❌ Invalid JSON format! Please enter a valid JSON object.");
        console.error("JSON Parsing Error:", err);
        return;
      }

      // Validate "data" key
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        alert("❌ Invalid JSON format. Ensure it contains a 'data' array.");
        return;
      }

      // Send request to backend
      const response = await axios.post(API_URL, parsedData);
      setResponseData(response.data);
    } catch (error) {
      alert("❌ Something went wrong! Check console for details.");
      console.error("Error in API call:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Bajaj API Challenge</h1>

      <label>Enter JSON Data:</label>
      <textarea
        rows="4"
        cols="50"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder='{"data": ["A", "1", "334", "4", "R"]}'
        style={{ width: "100%", padding: "10px", fontFamily: "monospace" }}
      ></textarea>

      <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px", width: "100%" }}>
        Submit
      </button>

      {responseData && (
        <div >
          <h2>Response:</h2>
          <pre style={{ backgroundColor: "#000", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;