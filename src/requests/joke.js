import axios from "axios";
const URL = "https://official-joke-api.appspot.com/random_joke";
export async function fetchJokes() {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("error fetching random joke!");
  }
}
