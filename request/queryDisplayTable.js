import axios from "axios";

export const queryDisplayTable = async () => {
  try {
    const response = await axios.get("/api/queryDisplayTable");
    console.log("Race Records value successfully retrieved.");
    return response.data
  } catch (error) {
    console.error("Error querying table:", error);
  }
};
