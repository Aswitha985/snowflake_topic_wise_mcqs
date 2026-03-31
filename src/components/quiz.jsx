import { useState } from "react";
import questions from "../questions";
import "../App.css";

function Quiz({ onSubmit, topic }) {
  const [answers, setAnswers] = useState({});

  const filteredQuestions = questions.filter(q => !topic || q.topic === topic);

  const handleSelect = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const handleSubmit = () => {
    let score = 0;

    filteredQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    onSubmit(score, answers);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="quiz-container">
      <h2 className="title">{topic ? `${topic} Quiz` : 'Python MCQ Quiz'}</h2>

      {filteredQuestions.map((q, index) => (
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