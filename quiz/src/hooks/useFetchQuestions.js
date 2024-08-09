import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api";

const useFetchQuestions = (difficulty) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?amount=10&difficulty=${difficulty}`
        );
        console.log(response.data.results);

        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:)", error);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);

  return { questions, loading, error };
};

export default useFetchQuestions;
