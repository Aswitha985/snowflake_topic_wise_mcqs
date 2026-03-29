import { useState } from "react";
import questions from "../data/questions";
import "../App.css";

function Quiz({ onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleSelect = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const handleSubmit = () => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    onSubmit(score, answers);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="quiz-container">
      <h2 className="title">Python MCQ Quiz</h2>

      {questions.map((q, index) => (
        <div className="question-card" key={q.id}>
          <h3>
            {index + 1}. {q.question}
          </h3>

          {q.options.map((opt, i) => (
            <div
              key={i}
              className={`option ${
                answers[q.id] === opt ? "selected" : ""
              }`}
              onClick={() => handleSelect(q.id, opt)}
            >
              <span className="label">{optionLabels[i]}.</span> {opt}
            </div>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz