const axios = require("axios");
const URL = "http://www.boredapi.com/api/activity";
async function fetchActivity(activityType) {
  try {
    const res = await axios.get(`${URL}?type=${activityType}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("error fetching activities !");
  }
}

module.exports = { fetchActivity };
