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

    console.log("Sending request...");

    const res = await axios.post(
      "https://baja-backend-virid.vercel.app/bfhl",
      { data },
      {
        timeout: 10000,
      }
    );

    console.log("Response:", res.data);

    setResponse(res.data);
  } catch (error) {
    console.error("FULL ERROR:", error);

    if (error.response) {
      console.log("Response Error:", error.response.data);
    }

    alert(error.message);
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