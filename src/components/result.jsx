import questions from "../data/questions";
import "../App.css";

function Result({ score, answers }) {
  return (
    <div className="quiz-container">
      <h2 className="title">Final Score: {score} / {questions.length}</h2>

      <h3 style={{ color: "white", textAlign: "center" }}>
        Answer Review
      </h3>

      {questions.map((q, index) => (
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