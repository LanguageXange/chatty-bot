const axios = require("axios");
const URL = "https://official-joke-api.appspot.com/random_joke";
async function fetchJokes() {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("error fetching random joke!");
  }
}

module.exports = { fetchJokes };
