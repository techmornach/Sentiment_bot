import React, { useState } from "react";
import axios from "axios";

const SentimentAnalysisForm = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/analyze-sentiment",
        { text }
      );
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for sentiment analysis..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Analyze Sentiment</button>
      </form>
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </div>
  );
};

export default SentimentAnalysisForm;
