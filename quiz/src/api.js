import axios from "axios";

export const fetchQuestions = async (difficulty) => {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`)
        return response.data.results
    
    } catch (error) {
        // console.error('Error fetching questions:)', error);
        throw error;
    
 }   
}
// https://opentdb.com/api.php?amount=10&difficulty=${difficulty}