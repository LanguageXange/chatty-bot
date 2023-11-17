import axios from "axios";
const URL = "http://www.boredapi.com/api/activity";
export async function fetchActivity(activityType) {
  try {
    const res = await axios.get(`${URL}?type=${activityType}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("error fetching activities !");
  }
}
