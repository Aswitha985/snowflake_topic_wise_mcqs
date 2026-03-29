import { useState } from "react";
import "../App.css";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return alert("Enter your name");
    onLogin(name);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Student Login</h2>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>Start Quiz</button>
      </div>
    </div>
  );
}

export default Login;