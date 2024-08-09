// import axios from "axios";

// export const fetchQuestions = async (difficulty) => {
//   try {
//     const response = await axios.get(
//       `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`
//     );
//     console.log(response.data.results);
//     return response.data.results;
//   } catch (error) {
//     console.error("Error fetching questions:)", error);
//     throw error;
//   }
// };
// api.js
export const BASE_URL = "https://opentdb.com/api.php";
