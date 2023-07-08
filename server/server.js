const express = require("express");
const natural = require("natural");
const cors = require("cors");
const path = require('path');


const app = express();
const tokenizer = new natural.WordTokenizer();
const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

app.use(express.json());
app.use(cors()); // Enable CORS
// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.post("/analyze-sentiment", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const tokens = tokenizer.tokenize(text);
  const sentiment = analyzer.getSentiment(tokens);

  res.json({ sentiment });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
