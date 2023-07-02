import axios from "axios";

export const queryRaceRank = async (colArr, conditionArr) => {
  try {
    const response = await axios.get("/api/queryRaceRank",{
      params: {
        colArr: colArr,
        conditionArr: conditionArr
      }
    }
    );
    console.log("Ranking value successfully retrieved.");
    return response.data
  } catch (error) {
    console.error("Error querying table:", error);
  }
};
