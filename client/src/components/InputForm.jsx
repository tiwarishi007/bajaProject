import { useState } from "react";

function InputForm({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = input
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="10"
        placeholder="Enter nodes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default InputForm;