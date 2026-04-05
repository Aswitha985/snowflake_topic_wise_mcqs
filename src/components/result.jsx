import { useState, useEffect } from "react";
import { getQuestionsByTopic } from "../services/firebase";
import "../App.css";

function Result({ score, answers, topic }) {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const questions = await getQuestionsByTopic(topic);
      setFilteredQuestions(questions || []);
      setLoading(false);
    };
    if (topic) loadQuestions();
  }, [topic]);

  if (loading) {
    return <div className="quiz-container"><h2>Loading results...</h2></div>;
  }

  return (
    <div className="quiz-container">
      <h2 className="title">Final Score: {score} / {filteredQuestions.length} {topic ? `(${topic})` : ''}</h2>

      <h3 style={{ color: "white", textAlign: "center" }}>
        Answer Review
      </h3>

      {filteredQuestions.map((q, index) => (
        <div className="question-card" key={q.id}>
          <h3>
            {index + 1}. {q.question}
          </h3>

          <p
            style={{
              color:
                answers[q.id] === q.answer
                  ? "green"
                  : answers[q.id]
                  ? "red"
                  : "gray",
              fontWeight: "bold",
            }}
          >
            Your Answer: {answers[q.id] || "Not Answered"}
          </p>

          <p style={{ color: "blue", fontWeight: "bold" }}>
            Correct Answer: {q.answer}
          </p>
        </div>
      ))}

      <button
        className="submit-btn"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
