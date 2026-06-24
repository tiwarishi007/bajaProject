import { useState } from "react";
import axios from "axios";

import InputForm from "./components/InputForm";
import ResponseCard from "./components/ResponseCard";

import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitData = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:9999/bfhl",
        {
          data,
        }
      );

      setResponse(res.data);
    } catch (error) {
      console.error(error);

      alert("API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>BFHL Hierarchy Builder</h1>

      <InputForm onSubmit={submitData} />

      {loading && <p>Loading...</p>}

      <ResponseCard data={response} />
    </div>
  );
}

export default App;