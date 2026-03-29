import { useState } from "react";
import Login from "./components/login";
import Quiz from "./components/quiz";
import Result from "./components/result";


function App() {
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  return (
    <div className="app-bg">
      <div className="university-header">
        <span role="img" aria-label="quiz" style={{marginRight: 12, fontSize: '2.2rem', verticalAlign: 'middle'}}>📝</span>
        <span style={{fontWeight: 700}}>Quiz Portal</span>
        <span style={{marginLeft: 12, fontSize: '1.5rem', verticalAlign: 'middle'}}>✨</span>
      </div>
      {!user ? (
        <Login onLogin={setUser} />
      ) : !submitted ? (
        <Quiz
          onSubmit={(s, a) => {
            setScore(s);
            setAnswers(a);
            setSubmitted(true);
          }}
        />
      ) : (
        <Result score={score} answers={answers} />
      )}
    </div>
  );
}

export default App